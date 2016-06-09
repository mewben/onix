package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

// AdminController struct
type AdminController struct{}

// GetTime current
func (*AdminController) GetTime(c echo.Context) error {
	ret, err := models.GetTime()
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}
