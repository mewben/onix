package models

import (
	"strings"

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
func (*Tag) Get() (response []Tag, err error) {
	var (
		q = `
			SELECT * FROM ` + TTAGS + `
			ORDER BY name
			LIMIT 500;
		`
	)

	err = db.Conn.Select(&response, q)

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
		if err = tag.fillAndValidate(t); err != nil {
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

func (tag *Tag) fillAndValidate(t TagPayload) (err error) {
	// fill
	tag.Name = strings.TrimSpace(t.Label)
	tag.Slug = utils.GenerateSlug(tag.Name)
	tag.MetaTitle = tag.Name

	return
}
