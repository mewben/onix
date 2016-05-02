package controllers

import (
	"github.com/labstack/echo"
)

type TagsController struct{}

func (*TagsController) Get(c echo.Context) error {
	return c.JSON(200, `get`)
}
