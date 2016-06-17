package models

import (
	"errors"
	"strconv"
	"strings"

	"github.com/extemporalgenome/slug"
	"github.com/mewben/db-go-env"

	"projects/onix/utils"
)

// Tag struct
type Tag struct {
	ID              int    `db:"id" json:"id"`
	Name            string `json:"name"`
	Slug            string `json:"slug"`
	Description     string `json:"description"`
	Image           string `json:"image"`
	IsVisible       bool   `db:"is_visible" json:"is_visible"`
	ParentID        int    `db:"parent_id" json:"parent_id"`
	MetaTitle       string `db:"meta_title" json:"meta_title"`
	MetaDescription string `db:"meta_description" json:"meta_description"`
	UpdatedBy       int    `db:"updated_by" json:"updated_by"`
}

// TagPayload struct
type TagPayload struct {
	Value     string `json:"value"`
	Label     string `json:"label"`
	NewOption bool   `json:"newOption"`
}

// Get all tags
// TODO: pagination
func (*Tag) Get(name string) (response []Tag, err error) {
	var (
		q = `
			SELECT * FROM ` + TTAGS + `
			WHERE name ILIKE $1
			ORDER BY name
			LIMIT 500;
		`
	)

	name = name + "%"

	err = db.Conn.Select(&response, q, name)

	return
}

// GetOne post
// @returns post with tags
func (*Tag) GetOne(sid string) (response Tag, err error) {
	var (
		q = `
			SELECT * FROM ` + TTAGS + `
			WHERE id = $1;
		`
	)

	err = db.Conn.Get(&response, q, sid)

	return
}

// Create tag
func (model *Tag) Create(payload Tag) (response Tag, err error) {
	var (
		q = `
			INSERT INTO ` + TTAGS + ` (
				name,
				slug,
				description,
				image,
				is_visible,
				parent_id,
				meta_title,
				meta_description
			) VALUES (
				:name,
				:slug,
				:description,
				:image,
				:is_visible,
				:parent_id,
				:meta_title,
				:meta_description
			) RETURNING id;
		`
	)

	// Prepare values
	// fill and validate
	if err = model.fillAndValidate(payload, false); err != nil {
		return
	}

	stmt, err := db.Conn.PrepareNamed(q)
	if err != nil {
		return
	}

	if err = stmt.Get(&model.ID, model); err != nil {
		return
	}

	response = *model
	return
}

// Update tag
func (model *Tag) Update(sid string, payload Tag) (response Tag, err error) {
	var (
		q = `
			UPDATE ` + TTAGS + `
			SET name = :name,
				slug = :slug,
				description = :description,
				image = :image,
				is_visible = :is_visible,
				parent_id = :parent_id,
				meta_title = :meta_title,
				meta_description = :meta_description,
				updated_by = :updated_by,
				updated_at = CURRENT_TIMESTAMP
			WHERE id = :id
			RETURNING id;
		`
	)

	// check if sid == payload.ID
	if strconv.Itoa(payload.ID) != sid {
		err = errors.New(utils.E_ID_NOT_MATCH)
		return
	}

	// Prepare values
	// fill and validate
	if err = model.fillAndValidate(payload, true); err != nil {
		return
	}

	stmt, err := db.Conn.PrepareNamed(q)
	if err != nil {
		return
	}

	if err = stmt.Get(&model.ID, model); err != nil {
		return
	}

	response = *model
	return
}

// ProcessTags from Create/Update Post
// @returns []int Tag.ID
func ProcessTags(tags []TagPayload, userID int) (response []int, err error) {
	var (
		q = `
			INSERT INTO ` + TTAGS + ` (
				name,
				slug,
				meta_title,
				updated_by
			) VALUES (
				:name,
				:slug,
				:meta_title,
				:updated_by
			) RETURNING id;
		`
	)

	tx, err := db.Conn.Beginx()
	if err != nil {
		return
	}

	// loop through tagspayload
	for _, t := range tags {
		// prepare values
		var tag Tag
		tag.UpdatedBy = userID
		if err = tag.fillAndValidateFromPost(t); err != nil {
			tx.Rollback()
			return
		}

		// insert if newOption
		if t.NewOption {
			var tagID int
			stmt, err2 := tx.PrepareNamed(q)
			if err2 != nil {
				err = err2
				tx.Rollback()
				return
			}

			if err2 = stmt.Get(&tagID, tag); err2 != nil {
				err = err2
				tx.Rollback()
				return
			}

			response = append(response, tagID)
		}
	} // end loop

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return
	}

	return
}

func (model *Tag) fillAndValidateFromPost(t TagPayload) (err error) {
	// fill
	model.Name = strings.TrimSpace(t.Label)
	model.Slug = utils.GenerateSlug(model.Name)
	model.MetaTitle = model.Name

	return
}

// fillAndValidate tag
func (model *Tag) fillAndValidate(payload Tag, isEdit bool) (err error) {

	if !isEdit {
		// new
	} else {
		model.ID = payload.ID
	}

	model.Name = strings.TrimSpace(payload.Name)
	model.Description = strings.TrimSpace(payload.Description)
	model.Slug = strings.TrimSpace(payload.Slug)
	if model.Slug == "" || !slug.IsSlugAscii(model.Slug) {
		// generate slug
		model.Slug = slug.Slug(model.Name)
	}
	model.Image = strings.TrimSpace(payload.Image)
	model.IsVisible = payload.IsVisible
	model.ParentID = payload.ParentID
	model.MetaTitle = payload.MetaTitle
	if model.MetaTitle == "" {
		model.MetaTitle = model.Name
	}
	model.MetaDescription = payload.MetaDescription
	if model.MetaDescription == "" {
		model.MetaDescription = model.Description
	}

	model.UpdatedBy = payload.UpdatedBy

	return
}
