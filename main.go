package main

import (
	"github.com/labstack/echo"
	mw "github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
	"github.com/mewben/config-echo"
	"github.com/mewben/db-go-env"

	"projects/onix/controllers"
	"projects/onix/theme"
)

func init() {
	var (
		conn db.Database
		port = "localhost:1300" // appport = 1300, proxy = 1310
	)

	conn.DbHost = "server2.dev"
	conn.DbPort = "5432"
	conn.DbUser = "mewben"
	conn.DbName = "onixdb"
	conn.DbPass = "passwD"
	conn.SslMode = "disable"

	// setup DB
	db.Setup(conn)

	// setup config
	config.Setup(port)
}

func main() {
	e := echo.New()
	e.Use(mw.Recover())
	e.Use(mw.Logger())
	e.Use(mw.Gzip())

	// Public
	// Setup Theme
	theme.Setup(e)

	// Public Routes
	e.Get("/mew", func(c *echo.Context) error {
		theme.Change("mew", e)
		return c.String(200, "Mew")
	})

	e.Get("/eevee", func(c *echo.Context) error {
		theme.Change("eevee", e)
		return c.String(200, "Eevee")
	})

	site := &controllers.SiteController{}
	e.Get("/", site.Home)

	e.Run(config.Port)
}
