package models

import (
	"database/sql"
	"log"
	"time"

	"github.com/lib/pq"
	"github.com/mewben/db-go-env"
)

type Content struct {
	Id              int
	Title           string
	Slug            string
	Body            sql.NullString
	Image           sql.NullString
	Type            string
	Status          string
	Featured        bool
	Language        string
	MetaTitle       sql.NullString `db:"meta_title"`
	MetaDescription sql.NullString `db:"meta_description"`
	AuthorId        int            `db:"author_id"`
	CreatedAt       time.Time      `db:"created_at"`
	CreatedBy       int            `db:"created_by"`
	UpdatedAt       time.Time      `db:"updated_at"`
	UpdatedBy       int            `db:"updated_by"`
	PublishedAt     pq.NullTime    `db:"published_at"`
	PublishedBy     int            `db:"published_by"`
}

func CreateContent(payload ContentPayload) (res interface{}, err error) {

	var (
		model    Content
		q_insert = `
			INSERT INTO content (
				title,
				slug,
				author_id,
				created_by,
				updated_by,
				published_by
			) VALUES (
				:title,
				:slug,
				:author_id,
				:created_by,
				:updated_by,
				:published_by
			) RETURNING id;`
		q = `
			SELECT *
			FROM content
			WHERE id = $1;`
	)

	log.Println("id:", payload.Id)
	log.Println("Title:", payload.Title)
	log.Println("Slug:", payload.Slug)
	log.Println("Body:", payload.Body)
	log.Println("Image:", payload.Image)
	log.Println("tags:", payload.Tags)

	// set values
	model.Title = payload.Title
	model.Slug = payload.Slug
	model.AuthorId = payload.Iss
	model.CreatedBy = payload.Iss
	model.UpdatedBy = payload.Iss
	model.PublishedBy = payload.Iss

	// TODO: query database if duplicate slug
	// if duplicate, add "-2" to the slug

	// execute the insert
	insert_query, err := db.Conn.PrepareNamed(q_insert)
	if err != nil {
		return
	}

	if err = insert_query.Get(&model.Id, model); err != nil {
		return
	}

	// query the model to get the default details
	if err = db.Conn.Get(&model, q, model.Id); err != nil {
		return
	}

	res = model
	return
}
