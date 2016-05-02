package models

import (
	"database/sql"
	"errors"
	"time"

	"github.com/lib/pq"
	"github.com/mewben/db-go-env"
	"golang.org/x/crypto/bcrypt"

	"projects/onix/utils"
)

type LoginPayload struct {
	Username string
	Password string
	Tz       int
}

type LoginResponse struct {
	Me     Me     `json:"me"`
	Jwt    string `json:"jwt"`
	JwtExp int    `json:"jwt_exp"`
	Rft    string `json:"rft"`
	RftExp int    `json:"rft_exp"`
}

type User struct {
	Id              int
	Username        string
	Password        string
	Name            string
	Slug            string
	Email           string
	Role            string
	Image           string
	Status          string
	Location        string
	Language        string
	Cover           string
	Bio             string
	Website         string
	MetaTitle       string      `db:"meta_title"`
	MetaDescription string      `db:"meta_description"`
	LastLogin       pq.NullTime `db:"last_login"`
	CreatedAt       time.Time   `db:"created_at"`
	UpdatedAt       time.Time   `db:"updated_at"`
}

type Me struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"-"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Slug     string `json:"slug"`
	Image    string `json:"image"`
	Status   string `json:"status"`
}

// ====== Returns
// - jwt
// - rft
// - me
// ====== Process
// 1. Get User Data (me)
// 2. Check password
// 3. Check if user active
// 4. Generate jwt
// 5. Generate rft
func (*User) Login(payload LoginPayload) (response interface{}, err error) {
	var (
		me   Me
		user User
	)

	// 1. Get Me
	me, err = user.GetMe(payload.Username)
	if err != nil {
		return
	}

	// 2. Check if correct password
	if bcrypt.CompareHashAndPassword([]byte(me.Password), []byte(payload.Password)) != nil {
		// Wrong password
		err = errors.New(utils.E_WRONG_CRED)
		return
	}

	// 3. Check if active
	if me.Status != "active" {
		err = errors.New(utils.E_USER_INACTIVE)
		return
	}

	// 4. Generate Tokens
	response, err := GenerateTokens(me.Id)

	// 4. jwt
	// Get the signingkey
	signingkey, err := utils.GetConfigString("admin_signingkey")
	if err != nil {
		return
	}
	jwt, err := utils.GenerateJWTToken(signingkey, payload.Tz, me)
	if err != nil {
		return
	}
	// 5. rft

	response = me
	return
}

// ===== Return Me
func (*User) GetMe(username string) (response Me, err error) {
	var (
		q_me = `
			SELECT
				id,
				username,
				password,
				email,
				name,
				slug,
				image,
				status
			FROM ` + TUSERS + `
			WHERE username = $1;
		`
	)

	if err = db.Conn.Get(&response, q_me, username); err != nil {
		if err == sql.ErrNoRows {
			err = errors.New(utils.E_WRONG_CRED)
		}
		return
	}

	return
}
