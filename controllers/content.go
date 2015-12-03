package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

type ContentController struct{}

func (*ContentController) Save(c *echo.Context) error {
	var payload models.ContentPayload

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	iss := 1

	payload.Iss = iss
	if ret, err := models.CreateContent(payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	} else {
		return c.JSON(200, ret)
	}
}
