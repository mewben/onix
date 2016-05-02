package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

type UsersController struct{}

func (*UsersController) Login(c echo.Context) error {
	var payload models.LoginPayload
	var user models.User

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	if ret, err := user.Login(payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	} else {
		return c.JSON(200, ret)
	}
}
