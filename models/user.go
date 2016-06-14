package models

import (
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/lib/pq"
	"github.com/mewben/db-go-env"
	"golang.org/x/crypto/bcrypt"

	"projects/onix/utils"
)

// LoginPayload struct
type LoginPayload struct {
	Username string
	Password string
}

// DelegatePayload struct
type DelegatePayload struct {
	Rft    string
	UserID int `json:"sub"`
}

// LoginResponse struct
type LoginResponse struct {
	Me     Me     `json:"me"`
	Jwt    string `json:"jwt"`
	JwtExp int    `json:"jwt_exp"`
	Rft    string `json:"rft"`
}

// User struct
type User struct {
	ID              int `db:"id" json:"id"`
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

// Me struct
type Me struct {
	ID       int    `db:"id" json:"id"`
	Username string `json:"username"`
	Password string `json:"-"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Slug     string `json:"slug"`
	Image    string `json:"image"`
	Status   string `json:"status"`
	Role     string `json:"role"`
}

// Login ====== Returns
// - jwt
// - rft
// - me
// ====== Process
// 1. Get User Data (me)
// 2. Check password
// 3. Check if user active
// 4. Generate jwt
// 5. Generate rft
func (user *User) Login(payload LoginPayload) (response LoginResponse, err error) {
	var (
		me               Me
		qUpdateLastLogin = `
			UPDATE ` + TUSERS + `
			SET last_login = CURRENT_TIMESTAMP
			WHERE id = $1;
		`
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
	response, err = GenerateTokens(me.ID, me.Role)
	if err != nil {
		log.Println("me", me)
		return
	}

	// 7. Update last_login
	if _, err = db.Conn.Exec(qUpdateLastLogin, me.ID); err != nil {
		return
	}

	response.Me = me

	return
}

// GetMe ===== Return Me
func (*User) GetMe(username string) (response Me, err error) {
	var (
		qMe = `
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

	if err = db.Conn.Get(&response, qMe, username); err != nil {
		if err == sql.ErrNoRows {
			err = errors.New(utils.E_WRONG_CRED)
		}
		return
	}

	return
}

// GetMeByID ===== Return Me By Id
func (*User) GetMeByID(id int) (response Me, err error) {
	var (
		qMe = `
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
			WHERE id = $1;
		`
	)

	if err = db.Conn.Get(&response, qMe, id); err != nil {
		if err == sql.ErrNoRows {
			err = errors.New(utils.E_WRONG_CRED)
		}
		return
	}

	return
}

// ChangePassword of the logged user
func (user *User) ChangePassword(userID int, old, new string) (response bool, err error) {
	var (
		q = `
			UPDATE ` + TUSERS + `
			SET password = $1,
				updated_at = CURRENT_TIMESTAMP,
				updated_by = $2;
		`
	)
	// 1. Get user
	me, err := user.GetMeByID(userID)
	if err != nil {
		return
	}

	// 2. Check if correct password
	if bcrypt.CompareHashAndPassword([]byte(me.Password), []byte(old)) != nil {
		// Wrong password
		err = errors.New(utils.E_WRONG_CRED)
		return
	}

	// 3. Change password
	newHash, _ := bcrypt.GenerateFromPassword([]byte(new), 10)
	newPass := string(newHash)
	res, err := db.Conn.Exec(q, newPass, me.ID)
	if err != nil {
		return
	}

	aff, err := res.RowsAffected()
	if err != nil {
		return
	}

	if aff == 0 {
		err = errors.New(utils.E_500)
	}

	response = true
	return
}
