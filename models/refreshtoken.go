package models

import (
	"errors"
	"time"

	"github.com/mewben/db-go-env"
	"projects/onix/utils"
)

type RefreshToken struct {
	Id        int
	UserId    int `db:"user_id"`
	Token     string
	ExpiresIn time.Time `db:"expires_in"`
}

// @params
// id -- user_id
func GenerateRefreshToken(id int) (token string, exp int, err error) {
	var (
		rft      RefreshToken
		q_insert = `
			INSERT INTO ` + TREFRESHTOKENS + ` (
				user_id,
				token,
				expires_in
			) VALUES (
				:user_id,
				:token,
				:expires_in
			) RETURNING id;
		`
		q_delete = `
			DELETE FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1;
		`
	)

	// Get expiry of refreshtoken in minutes
	exp, err = GetSettingInt("admin_session")
	if err != nil {
		return
	}

	// GenerateRandomToken
	token = utils.GenerateRandomToken()

	rft.UserId = id
	rft.Token = token
	rft.ExpiresIn = time.Now().Add(time.Minute * time.Duration(exp))

	// Remove existing refresh token of this user first
	if _, err = db.Conn.Exec(q_delete, id); err != nil {
		return
	}

	stmt, err := db.Conn.PrepareNamed(q_insert)
	if err != nil {
		return
	}

	err = stmt.Get(&rft.Id, rft)

	return
}

// Delete Refresh Token
func DeleteRefreshToken(iss int, rft string) (response bool, err error) {
	var (
		q = `
			DELETE FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1
				AND token = $2;
		`
	)

	_, err = db.Conn.Exec(q, iss, rft)
	response = true

	return
}

// Delegate
// jwt is expired, get a new jwt
func Delegate(iss int, rft string) (response LoginResponse, err error) {
	var (
		user          User
		refresh_token RefreshToken
		q_get         = `
			SELECT * FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1
				AND token = $2;
		`
	)

	// get the rft
	if err = db.Conn.Get(&refresh_token, q_get, iss, rft); err != nil {
		return
	}

	// Check if rft is expired
	if refresh_token.ExpiresIn.Sub(time.Now()) < 0 {
		err = errors.New(utils.E_SESSION_EXPIRED)
		return
	}

	// Get Me By id
	me, err := user.GetMeById(iss)
	if err != nil {
		return
	}

	// Generete tokens
	response, err = GenerateTokens(iss, me.Role)
	if err != nil {
		return
	}

	response.Me = me

	return
}

// Generate Tokens
// when login
// when delegate (refresh token)
func GenerateTokens(iss int, role string) (response LoginResponse, err error) {
	// Get the admin_signingkey
	signing_key, err := GetSettingString("admin_signingkey")
	if err != nil {
		return
	}

	// Get the admin_jwt_exp
	jwt_exp, err := GetSettingInt("admin_jwt_exp")
	if err != nil {
		return
	}

	jwt, err := utils.GenerateJWTToken(signing_key, jwt_exp, iss, role)
	if err != nil {
		return
	}

	rft, rft_exp, err := GenerateRefreshToken(iss)
	if err != nil {
		return
	}

	response.Jwt = jwt
	response.JwtExp = jwt_exp
	response.Rft = rft
	response.RftExp = rft_exp

	return
}
