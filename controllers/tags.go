package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

// TagsController struct
type TagsController struct{}

// Get all tags
func (*TagsController) Get(c echo.Context) error {
	var model models.Tag

	ret, err := model.Get()
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}
