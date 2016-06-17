package models

import (
	"errors"
	"strconv"
	"strings"

	"github.com/extemporalgenome/slug"
	"github.com/lib/pq"
	"github.com/mewben/db-go-env"
	"github.com/satori/go.uuid"

	"projects/onix/utils"
)

// Post struct
type Post struct {
	ID              int          `db:"id" json:"id"`
	UUID            string       `db:"uuid" json:"uuid"`
	Title           string       `json:"title"`
	Subtitle        string       `json:"subtitle"`
	Slug            string       `json:"slug"`
	Body            string       `json:"body"`
	Excerpt         string       `json:"excerpt"`
	Type            string       `json:"type"`
	Featured        bool         `json:"featured"`
	PublishedAt     pq.NullTime  `db:"published_at" json:"published_at"`
	Image           string       `json:"image"`
	Tags            []TagPayload `json:"tags"`
	AuthorID        int          `db:"author_id" json:"author_id"`
	MetaTitle       string       `db:"meta_title" json:"meta_title"`
	MetaDescription string       `db:"meta_description" json:"meta_description"`
	Status          string       `json:"status"`
	CreatedBy       int          `db:"created_by" json:"created_by"`
	UpdatedBy       int          `db:"updated_by" json:"updated_by"`
}

// PostPayload struct
type PostPayload struct {
	ID              int          `json:"id"`
	Title           string       `json:"title"`
	Subtitle        string       `json:"subtitle"`
	Slug            string       `json:"slug"`
	Body            string       `json:"body"`
	Excerpt         string       `json:"excerpt"`
	Featured        bool         `json:"featured"`
	PublishedAt     string       `json:"published_at"`
	Image           string       `json:"image"`
	Tags            []TagPayload `json:"tags"`
	AuthorID        int          `json:"author_id"`
	MetaTitle       string       `json:"meta_title"`
	MetaDescription string       `json:"meta_description"`
	UpdatedBy       int          `db:"updated_by" json:"updated_by"`
}

// Create a post
func (model *Post) Create(payload PostPayload, status string) (response Post, err error) {
	var (
		q = `
			INSERT INTO ` + TPOSTS + ` (
				uuid,
				title,
				subtitle,
				slug,
				body,
				excerpt,
				type,
				status,
				featured,
				published_at,
				image,
				author_id,
				meta_title,
				meta_description,
				created_by,
				updated_by
			) VALUES (
				:uuid,
				:title,
				:subtitle,
				:slug,
				:body,
				:excerpt,
				:type,
				:status,
				:featured,
				:published_at,
				:image,
				:author_id,
				:meta_title,
				:meta_description,
				:created_by,
				:updated_by
			) RETURNING id;
		`
		qInsertPostsTags = `
				INSERT INTO ` + TPOSTSTAGS + ` (
					post_id,
					tag_id
				) VALUES (
					$1,
					$2
				);
			`
	)

	model.Status = status
	if model.Status == "" {
		model.Status = "draft"
	}

	// Prepare values
	// fill and validate
	if err = model.fillAndValidate(payload, false); err != nil {
		return
	}

	// begin transaction
	model.Type = "post"
	//	log.Println("qTags", qTags)
	//	log.Println("qpt", qInsertPostsTags)

	tx, err := db.Conn.Beginx()
	if err != nil {
		return
	}

	// insert post
	stmt, err := tx.PrepareNamed(q)
	if err != nil {
		tx.Rollback()
		return
	}

	if err = stmt.Get(&model.ID, model); err != nil {
		tx.Rollback()
		return
	}

	// insert or delete tags
	tagIDs, err := ProcessTags(payload.Tags, payload.AuthorID)
	if err != nil {
		tx.Rollback()
		return
	}

	// get id of the tags that were not newly created
	for _, pTag := range payload.Tags {
		if !pTag.NewOption {
			// try to convert value to int
			id, err2 := strconv.Atoi(pTag.Value)
			if err2 != nil {
				err = err2
				tx.Rollback()
				return
			}

			// append to newly created tag ids
			tagIDs = append(tagIDs, id)
		}
	}

	// insert post tags id
	for _, tagID := range tagIDs {
		_, err = tx.Exec(qInsertPostsTags, model.ID, tagID)
		if err != nil {
			tx.Rollback()
			return
		}
	}

	// commit
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return
	}

	response, err = model.GetOne(strconv.Itoa(model.ID))

	return
}

// Update post
func (model *Post) Update(sid string, payload PostPayload, status string) (response Post, err error) {
	var (
		q = `
			UPDATE ` + TPOSTS + `
			SET title = :title,
				subtitle = :subtitle,
				slug = :slug,
				body = :body,
				excerpt = :excerpt,
				featured = :featured,
				published_at = :published_at,
				image = :image,
				meta_title = :meta_title,
				meta_description = :meta_description,
				status = :status,
				updated_by = :updated_by,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = :id
			RETURNING id;
		`
		qDeleteTags = `
			DELETE FROM ` + TPOSTSTAGS + `
			WHERE post_id = $1;
		`
		qInsertPostsTags = `
			INSERT INTO ` + TPOSTSTAGS + ` (
				post_id,
				tag_id
			) VALUES (
				$1,
				$2
			);
		`
	)

	// check if sid == payload.ID
	if strconv.Itoa(payload.ID) != sid {
		err = errors.New(utils.E_ID_NOT_MATCH)
		return
	}

	model.Status = status
	if model.Status == "" {
		model.Status = "draft"
	}

	// Prepare values
	// fill and validate
	if err = model.fillAndValidate(payload, true); err != nil {
		return
	}

	tx, err := db.Conn.Beginx()
	if err != nil {
		return
	}

	// update post
	stmt, err := tx.PrepareNamed(q)
	if err != nil {
		tx.Rollback()
		return
	}

	if err = stmt.Get(&model.ID, model); err != nil {
		tx.Rollback()
		return
	}

	// insert or delete tags
	tagIDs, err := ProcessTags(payload.Tags, payload.UpdatedBy)
	if err != nil {
		tx.Rollback()
		return
	}

	// get id of the tags that were not newly created
	for _, pTag := range payload.Tags {
		if !pTag.NewOption {
			// try to convert value to int
			id, err2 := strconv.Atoi(pTag.Value)
			if err2 != nil {
				err = err2
				tx.Rollback()
				return
			}

			// append to newly created tag ids
			tagIDs = append(tagIDs, id)
		}
	}

	// remove associated tags first
	_, err = tx.Exec(qDeleteTags, model.ID)
	if err != nil {
		tx.Rollback()
		return
	}

	// insert post tags id
	for _, tagID := range tagIDs {
		_, err = tx.Exec(qInsertPostsTags, model.ID, tagID)
		if err != nil {
			tx.Rollback()
			return
		}
	}

	// commit
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return
	}

	response, err = model.GetOne(strconv.Itoa(model.ID))

	return
}

// Get post
// TODO: pagination
func (*Post) Get(title string) (response []Post, err error) {
	var (
		q = `
			SELECT
				id,
				title,
				status,
				published_at
			FROM ` + TPOSTS + `
			WHERE type = 'post'
				AND title ILIKE $1
			ORDER BY created_at DESC
			LIMIT 100;
		`
	)

	title = title + "%"

	if err = db.Conn.Select(&response, q, title); err != nil {
		return
	}

	return
}

// GetOne post
// @returns post with tags
func (*Post) GetOne(sid string) (response Post, err error) {
	var (
		q = `
			SELECT * FROM ` + TPOSTS + `
			WHERE id = $1;
		`
		qTags = `
			SELECT
				T1.id::text as value,
				T1.name as label
			FROM ` + TPOSTSTAGS + ` AS T0
			INNER JOIN ` + TTAGS + ` AS T1
				ON T1.id = T0.tag_id
			WHERE T0.post_id = $1;
		`
	)

	err = db.Conn.Get(&response, q, sid)
	err = db.Conn.Select(&response.Tags, qTags, sid)

	return
}

func (model *Post) fillAndValidate(payload PostPayload, isEdit bool) (err error) {

	body := strings.TrimSpace(payload.Body)
	if !isEdit {
		// new
		// uuid
		model.UUID = uuid.NewV4().String()
		model.CreatedBy = payload.AuthorID

		// generate excerpt
		bodyLength := len(body)
		// get # of characters to generate excerpt
		// this is usually taken from settings
		// but we'll hard code it for now
		excerptChars := 200
		if bodyLength < excerptChars {
			excerptChars = bodyLength
		}

		model.Excerpt = body[:excerptChars]
	} else {
		model.ID = payload.ID
		model.Excerpt = strings.TrimSpace(payload.Excerpt)
	}

	model.Title = strings.TrimSpace(payload.Title)
	model.Slug = strings.TrimSpace(payload.Slug)
	if model.Slug == "" || !slug.IsSlugAscii(model.Slug) {
		// generate slug
		model.Slug = slug.Slug(model.Title)
	}

	model.Subtitle = strings.TrimSpace(payload.Subtitle)
	model.Body = body
	model.Featured = payload.Featured
	model.Image = strings.TrimSpace(payload.Image)
	model.AuthorID = payload.AuthorID
	model.UpdatedBy = payload.AuthorID
	model.MetaTitle = strings.TrimSpace(payload.MetaTitle)
	model.MetaDescription = strings.TrimSpace(payload.MetaDescription)

	if model.Status == "published" {
		// parse published_at from format: MM-DD-YYYY hh:mm
		publishedAt, err2 := utils.ParseDate(LONGFORM, payload.PublishedAt)
		if err2 != nil {
			err = err2
			return
		}
		model.PublishedAt = pq.NullTime{
			Time:  publishedAt,
			Valid: true,
		}
	}

	return
}
