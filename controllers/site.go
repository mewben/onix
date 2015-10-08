package controllers

import (
	"github.com/labstack/echo"
)

type SiteController struct{}

func (*SiteController) Home(c *echo.Context) error {
	return c.Render(200, "index", "World")
}
