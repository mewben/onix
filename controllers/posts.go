package controllers

import (
	"github.com/labstack/echo"

	"projects/onix/models"
	"projects/onix/utils"
)

// PostsController struct
type PostsController struct{}

// Get posts
func (*PostsController) Get(c echo.Context) error {
	var model models.Post
	var title = c.QueryParam("title")

	ret, err := model.Get(title)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// GetOne post
func (*PostsController) GetOne(c echo.Context) error {
	var model models.Post

	ret, err := model.GetOne(c.P(0))
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	return c.JSON(200, ret)
}

// Save post
func (*PostsController) Save(c echo.Context) error {
	var model models.Post
	var payload models.PostPayload
	var status = c.QueryParam("status")

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	iss := 1

	payload.AuthorID = iss
	ret, err := model.Create(payload, status)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}
	return c.JSON(200, ret)
}

// Update post
func (*PostsController) Update(c echo.Context) error {
	var model models.Post
	var payload models.PostPayload
	var status = c.QueryParam("status")

	if err := c.Bind(&payload); err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}

	iss := 1

	payload.UpdatedBy = iss
	ret, err := model.Update(c.P(0), payload, status)
	if err != nil {
		return c.JSON(400, utils.ErrMarshal(err.Error()))
	}
	return c.JSON(200, ret)
}
