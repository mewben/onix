package controllers

import (
	"github.com/labstack/echo"
	"log"
)

type SiteController struct{}

func (*SiteController) Home(c *echo.Context) error {
	log.Println("home")
	return c.Render(200, "test", "World")
}
