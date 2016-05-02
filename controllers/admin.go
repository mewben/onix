package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

type AdminController struct{}

func (*AdminController) GetUTCTime(c echo.Context) error {
	if ret, err := models.GetUTCTime(); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	} else {
		return c.JSON(200, ret)
	}
}
