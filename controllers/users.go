package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

// UsersController struct
type UsersController struct{}

// Login POST /auth/login
func (*UsersController) Login(c echo.Context) error {
	var payload models.LoginPayload
	var user models.User

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	ret, err := user.Login(payload)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// Logout POST /auth/logout
func (*UsersController) Logout(c echo.Context) error {
	type pl struct {
		Rft string
	}

	var payload pl

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	userID := int(c.Get("userID").(float64))

	ret, err := models.DeleteRefreshToken(userID, payload.Rft)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// Delegate refresh tokens POST /auth/delegation
func (*UsersController) Delegate(c echo.Context) error {
	var payload models.DelegatePayload

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	ret, err := models.Delegate(payload)
	if err != nil {
		return c.JSON(401, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// Password Change password of logged user
func (*UsersController) Password(c echo.Context) error {
	type pl struct {
		Oldp string `json:"old_password"`
		Newp string `json:"new_password"`
		Conp string `json:"confirm_password"`
	}

	var payload pl
	var model models.User

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	if payload.Newp != payload.Conp {
		return c.JSON(400, utils.ErrMarshal("Password did not match."))
	}

	userID := int(c.Get("userID").(float64))
	ret, err := model.ChangePassword(userID, payload.Oldp, payload.Newp)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}
