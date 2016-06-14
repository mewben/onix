package models

import (
	"errors"
	"time"

	"github.com/mewben/db-go-env"

	"projects/onix/utils"
)

// RefreshToken struct
type RefreshToken struct {
	ID        int `db:"id"`
	UserID    int `db:"user_id"`
	Token     string
	ExpiresIn time.Time `db:"expires_in"`
}

// GenerateRefreshToken @params
// id -- user_id
func GenerateRefreshToken(id int) (token string, err error) {
	var (
		rft     RefreshToken
		qInsert = `
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
		qDelete = `
			DELETE FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1;
		`
	)

	// Get expiry of refreshtoken in minutes
	exp, err := GetSettingInt("admin_session")
	if err != nil {
		return
	}

	// GenerateRandomToken
	token = utils.GenerateRandomToken()

	rft.UserID = id
	rft.Token = token
	rft.ExpiresIn = time.Now().Add(time.Minute * time.Duration(exp))

	// Remove existing refresh token of this user first
	if _, err = db.Conn.Exec(qDelete, id); err != nil {
		return
	}

	stmt, err := db.Conn.PrepareNamed(qInsert)
	if err != nil {
		return
	}

	err = stmt.Get(&rft.ID, rft)

	return
}

// DeleteRefreshToken remove
func DeleteRefreshToken(userID int, rft string) (response bool, err error) {
	var (
		q = `
			DELETE FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1
				AND token = $2;
		`
	)

	_, err = db.Conn.Exec(q, userID, rft)
	response = true

	return
}

// Delegate renew token
// jwt is expired, get a new jwt
func Delegate(payload DelegatePayload) (response LoginResponse, err error) {
	var (
		user         User
		refreshToken RefreshToken
		qGet         = `
			SELECT * FROM ` + TREFRESHTOKENS + `
			WHERE user_id = $1
				AND token = $2;
		`
	)

	// get the rft
	if err = db.Conn.Get(&refreshToken, qGet, payload.UserID, payload.Rft); err != nil {
		return
	}

	// Check if rft is expired
	if refreshToken.ExpiresIn.Sub(time.Now()) < 0 {
		err = errors.New(utils.E_SESSION_EXPIRED)
		return
	}

	// Get Me By id
	me, err := user.GetMeByID(payload.UserID)
	if err != nil {
		return
	}

	// Generete tokens
	response, err = GenerateTokens(payload.UserID, me.Role)
	if err != nil {
		return
	}

	response.Me = me

	return
}

// GenerateTokens when login
// when delegate (refresh token)
func GenerateTokens(userID int, role string) (response LoginResponse, err error) {
	// Get the edp_signingkey
	signingKey, err := GetSettingString("admin_signingkey")
	if err != nil {
		return
	}

	// Get the admin_jwt_exp
	jwtExp, err := GetSettingInt("admin_jwt_exp")
	if err != nil {
		return
	}

	jwt, err := utils.GenerateJWTToken(signingKey, jwtExp, userID, role)
	if err != nil {
		return
	}

	rft, err := GenerateRefreshToken(userID)
	if err != nil {
		return
	}

	response.Jwt = jwt
	response.JwtExp = jwtExp
	response.Rft = rft

	return
}
