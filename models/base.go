package models

import (
	"time"
)

const (
	TUSERS = "users"
)

type (
	ContentPayload struct {
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
)

// returns the current datetime
// based on the time_offset setting
func GetUTCTime() (response string, err error) {
	var utc = time.Now().UTC()

	offset := time.Duration(8) // +8:00

	response = utc.Add(offset * time.Hour).Format("01-02-2006 15:04")

	return
}
