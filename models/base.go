package models

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
