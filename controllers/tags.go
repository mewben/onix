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
	var name = c.QueryParam("name")

	ret, err := model.Get(name)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// GetOne tag
func (*TagsController) GetOne(c echo.Context) error {
	var model models.Tag

	ret, err := model.GetOne(c.P(0))
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// Save tag
func (*TagsController) Save(c echo.Context) error {
	var model models.Tag
	var payload models.Tag

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	iss := 1

	payload.UpdatedBy = iss
	ret, err := model.Create(payload)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}
	return c.JSON(200, ret)
}

// Update tag
func (*TagsController) Update(c echo.Context) error {
	var model models.Tag
	var payload models.Tag

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	iss := 1

	payload.UpdatedBy = iss
	ret, err := model.Update(c.P(0), payload)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}
	return c.JSON(200, ret)
}
