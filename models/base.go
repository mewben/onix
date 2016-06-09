package models

import (
	"time"
)

// Tables
const (
	TPOSTS         = "posts"
	TPOSTSTAGS     = "posts_tags"
	TREFRESHTOKENS = "refresh_tokens"
	TSETTINGS      = "settings"
	TTAGS          = "tags"
	TUSERS         = "users"

	LONGFORM = "01-02-2006 15:04 -07"
)

type ContentPayload struct {
	Id              int
	Title           string
	Slug            string
	Body            string
	Image           string
	Type            string
	Tags            []string
	Status          string
	Featured        bool
	Language        string
	MetaTitle       string `db:"meta_title"`
	MetaDescription string `db:"meta_description"`
	AuthorId        int    `db:"author_id"`
	CreatedBy       int    `db:"created_by"`
	UpdatedBy       int    `db:"updated_by"`
	PublishedAt     string `db:"published_at"`
	PublishedBy     int    `db:"published_by"`
	Iss             int
}

// GetTime returns the current datetime
// based on the time_offset setting
func GetTime() (response string, err error) {
	var utc = time.Now().UTC()

	// get timezone of the user
	offset := time.Duration(8) // +8:00

	response = utc.Add(offset * time.Hour).Format("01-02-2006 15:04")

	return
}
