package models

import (
	"encoding/json"
	"html/template"
	"time"

	"github.com/mewben/db-go-env"
)

// HomeResponse struct
type HomeResponse struct {
	Template string
	Site     Site
	Data     []SinglePost
	Meta     Meta
}

// SingleResponse struct post/page
type SingleResponse struct {
	Template string
	Site     Site
	Data     SinglePost
	Meta     Meta
}

// Site struct
type Site struct {
	Title         string
	Tagline       string
	Description   string
	Address       string
	Language      string
	Timezone      string
	Privacy       string
	EnableComment string
	Menu          template.HTML
	Others        template.HTML
}

// SinglePost struct
type SinglePost struct {
	Title       string
	Permalink   string
	Body        template.HTML
	Excerpt     template.HTML
	PublishedAt time.Time
}

// Meta struct
type Meta struct {
	Total     int
	Page      int
	BodyClass string
}

// Home data
func (*Site) Home() (response HomeResponse, err error) {
	var (
		posts  []Post
		qPosts = `
			SELECT
				title,
				slug,
				excerpt,
				published_at
			FROM ` + TPOSTS + `
			WHERE type = 'post'
				AND status = 'published'
			ORDER BY published_at DESC
			LIMIT 20;
		`
	)

	// Get site data
	site, err := GetSiteData()
	if err != nil {
		return
	}

	if err = db.Conn.Select(&posts, qPosts); err != nil {
		return
	}

	// loop through posts to convert excerpt to html
	postlist := make([]SinglePost, len(posts))
	for k, post := range posts {
		postlist[k].Title = post.Title
		postlist[k].Permalink = site.Address + post.Slug
		postlist[k].PublishedAt = post.PublishedAt.Time
		postlist[k].Excerpt = template.HTML(post.Excerpt)
	}

	response.Template = "home"
	response.Site = site
	response.Data = postlist
	return
}

// Single post/page
func (*Site) Single(slug string) (response SingleResponse, err error) {
	var (
		single SinglePost
		post   Post
		q      = `
			SELECT * FROM ` + TPOSTS + `
			WHERE slug = $1;
		`
	)

	site, err := GetSiteData()
	if err != nil {
		return
	}

	err = db.Conn.Get(&post, q, slug)

	single.Title = post.Title
	single.Permalink = site.Address + post.Slug
	single.Body = template.HTML(post.Body)
	single.PublishedAt = post.PublishedAt.Time

	response.Template = "post"
	response.Site = site
	response.Data = single

	return
}

// GetSiteData from db
func GetSiteData() (response Site, err error) {
	var (
		siteDataRaw string
		siteDataMap map[string]string
		q           = `
			SELECT value FROM ` + TSETTINGS + `
			WHERE key = 'site';
		`
	)

	if err = db.Conn.Get(&siteDataRaw, q); err != nil {
		return
	}

	// parse raw data to json
	if err = json.Unmarshal([]byte(siteDataRaw), &siteDataMap); err != nil {
		return
	}

	// Assign each to response
	if Title, ok := siteDataMap["site_title"]; ok {
		response.Title = Title
	}
	if Tagline, ok := siteDataMap["site_tagline"]; ok {
		response.Tagline = Tagline
	}
	if Description, ok := siteDataMap["site_description"]; ok {
		response.Description = Description
	}
	if Address, ok := siteDataMap["site_address"]; ok {
		response.Address = Address
	}
	if Language, ok := siteDataMap["site_language"]; ok {
		response.Language = Language
	}
	if Timezone, ok := siteDataMap["site_timezone"]; ok {
		response.Timezone = Timezone
	}
	if Privacy, ok := siteDataMap["site_privacy"]; ok {
		response.Privacy = Privacy
	}
	if EnableComment, ok := siteDataMap["site_enable_comment"]; ok {
		response.EnableComment = EnableComment
	}
	if Menu, ok := siteDataMap["site_menu"]; ok {
		response.Menu = template.HTML(Menu)
	}

	return
}
