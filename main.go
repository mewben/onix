package main

import (
	"log"

	"github.com/labstack/echo"
	mw "github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
	"github.com/mewben/config-echo"
	"github.com/mewben/db-go-env"
	"github.com/rs/cors"
	"github.com/thoas/stats"

	"projects/onix/controllers"
	"projects/onix/theme"
)

func init() {
	// get env
	conn, port := utils.GetEnv()

	// setup DB
	db.Setup(conn)

	// setup config
	config.Setup(port)
}

func main() {
	e := echo.New()

	e.Use(mw.Recover())
	e.Use(mw.Gzip())

	key, err := utils.GetConfigString("admin_signingkey")
	if err != nil {
		panic(err)
	}

	api := e.Group("/api")

	if config.Mode == "dev" {
		e.SetDebug(true)
		e.Use(mw.Logger())

		c := cors.New(cors.Options{
			AllowedOrigins:   []string{"*"},
			AllowedMethods:   []string{"POST", "GET", "PUT", "DELETE"},
			AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization"},
			AllowCredentials: true,
		})
		e.Use(cors.Default().Handler)
		api.Use(c.Handler)
	}

	// Public
	// Setup Theme
	theme.Setup(e)

	e.ServeFile("/admin*", "public/admin/index.html")
	e.ServeFile("/admin/*", "public/admin/index.html")
	e.Static("/admin/build", "public/admin/build")

	// Public Routes
	s := stats.New()
	e.Get("/stats", func(c *echo.Context) error {
		return c.JSON(200, s.Data())
	})
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

	// ======== API
	content := controllers.ContentController{}
	api.Post("/content", content.Save)
	api.Put("/content/:id", content.Save)

	log.Println("Listening at " + config.Port)
	e.Run(config.Port)
}
