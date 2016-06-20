package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
)

// SiteController struct
type SiteController struct{}

// Home displays home page
func (*SiteController) Home(c echo.Context) error {
	var site models.Site

	ret, err := site.Home()
	if err != nil {
		return c.Render(500, "500", err)
	}

	return c.Render(200, "index", ret)
}

// Single shows single page
func (*SiteController) Single(c echo.Context) error {
	var site models.Site

	ret, err := site.Single(c.P(0))
	if err != nil {
		return c.Render(400, "404", err)
	}

	return c.Render(200, "index", ret)
}

// Sitemap xml
func (*SiteController) Sitemap(c echo.Context) error {
	ret, err := models.Sitemap()
	if err != nil {
		return c.XML(400, err)
	}

	return c.XML(200, ret)
}
