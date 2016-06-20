package models

import (
	"github.com/mewben/db-go-env"
)

type urlset struct {
	URL   []SitemapItem `xml:"url"`
	Xmlns string        `xml:"xmlns,attr"`
}

// SitemapItem struct
type SitemapItem struct {
	Loc        string  `xml:"loc"`
	LastMod    string  `xml:"lastmod"`
	Changefreq string  `xml:"changefreq,omitempty"`
	Priority   float32 `xml:"priority,omitempty"`
}

// Sitemap generate
func Sitemap() (response urlset, err error) {
	var (
		posts  []Post
		pages  []Post
		qPosts = `
			SELECT
				slug,
				published_at
			FROM ` + TPOSTS + `
			WHERE type = 'post'
				AND status = 'published'
			ORDER BY published_at DESC;
		`
		qPages = `
			SELECT
				slug,
				updated_at
			FROM ` + TPOSTS + `
			WHERE type = 'page'
				AND status = 'active';
		`
	)

	// get site data
	// Get site data
	site, err := GetSiteData()
	if err != nil {
		return
	}

	if err = db.Conn.Select(&posts, qPosts); err != nil {
		return
	}

	for _, post := range posts {
		response.URL = append(response.URL, SitemapItem{
			Loc:     site.Address + post.Slug,
			LastMod: post.PublishedAt.Time.Format("2006-01-02T15:04:05+08:00"),
		})
	}

	if err = db.Conn.Select(&pages, qPages); err != nil {
		return
	}

	for _, page := range pages {
		response.URL = append(response.URL, SitemapItem{
			Loc:     site.Address + page.Slug,
			LastMod: page.UpdatedAt.Format("2006-01-02T15:04:05+08:00"),
		})
	}

	response.Xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9"
	return
}
