package main

import (
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/jaredfolkins/badactor"
	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/fasthttp"
	"github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
	"github.com/mewben/config-echo"
	"github.com/mewben/db-go-env"

	"projects/onix/controllers"
	mw "projects/onix/middleware"
	"projects/onix/models"
	"projects/onix/theme"
	"projects/onix/utils"
)

// Initialize Port and DB Connection config
func init() {
	type Config struct {
		SERVERPORT string
		DB         db.Database
	}

	configFile, err := os.Open("env.json")
	if err != nil {
		panic(err)
	}

	var devConfig Config
	jsonParser := json.NewDecoder(configFile)

	if err = jsonParser.Decode(&devConfig); err != nil {
		panic(err)
	}

	// setup postgres db connection
	db.Setup(devConfig.DB)

	// get mode from environment
	mode := os.Getenv("MODE")

	// setup port
	// This sets the global Port string
	// If you set an environment variable DATABASE_URL,
	// it sets Mode = "prod" and uses the env Port instead
	config.Setup(devConfig.SERVERPORT, mode)
}

func main() {
	app := echo.New()
	// create new Studio
	utils.ST = badactor.NewStudio(1024) // studio capacity... RAM?

	// add the rule to the stack
	utils.ST.AddRule(mw.LoginRule)
	err := utils.ST.CreateDirectors(1024)
	if err != nil {
		log.Fatal(err)
	}

	//poll duration
	dur := time.Minute * time.Duration(60)
	// Start the reaper
	utils.ST.StartReaper(dur)

	app.Use(middleware.Recover())
	app.Use(middleware.Gzip())
	app.Use(middleware.Secure())
	app.Use(middleware.BodyLimit("100K"))

	api := app.Group("/api")

	if config.Mode == "dev" {
		// Enable Debug
		app.Use(middleware.Logger())
		app.SetDebug(true)
		corsEnabled := middleware.CORSWithConfig(middleware.CORSConfig{
			AllowHeaders: []string{
				echo.HeaderOrigin,
				echo.HeaderContentType,
				echo.HeaderAcceptEncoding,
				echo.HeaderAuthorization,
			},
		})
		// Enable CORS /
		app.Use(corsEnabled)
		// Enable CORS /api
		api.Use(corsEnabled)
	}

	// admin routing
	// app.Static("/admin", "public/admin")
	app.Static("/admin/assets", "public/admin/assets")
	app.Static("/tinymce", "public/tinymce")
	app.File("/admin*", "public/admin/index.html")
	app.File("/admin/*", "public/admin/index.html")

	// Public
	// Setup Theme
	theme.Setup(app, config.Mode)

	users := controllers.UsersController{}
	app.POST("/auth/login", users.Login, mw.Jailer)
	app.POST("/auth/delegation", users.Delegate)

	// Get jwt signingkey
	signingKey, err := models.GetSettingString("admin_signingkey")
	if err != nil {
		panic(err)
	}
	// get api routes
	api.Use(middleware.JWT([]byte(signingKey)))

	APIRoutes(api)

	// ======= SITES =====
	site := controllers.SiteController{}
	app.GET("/", site.Home)
	app.GET("/:slug", site.Single)
	app.GET("/sitemap.xml", site.Sitemap)

	app.Run(fasthttp.New(config.Port))
}

// APIRoutes definition
// ========== API ROUTES ======
func APIRoutes(api *echo.Group) {

	// ======= ADMIN API ======
	admin := controllers.AdminController{}
	api.Get("/time", admin.GetTime)

	posts := controllers.PostsController{}
	api.GET("/posts/:id", posts.GetOne)
	api.GET("/posts", posts.Get)
	api.POST("/posts", posts.Save)
	api.PUT("/posts/:id", posts.Update)

	// CRUD /api/tags
	tags := controllers.TagsController{}
	api.GET("/tags/:id", tags.GetOne)
	api.GET("/tags", tags.Get)
	api.POST("/tags", tags.Save)
	api.PUT("/tags/:id", tags.Update)
	/*	api.Delete("/tags/:id", tags.Destroy)
	 */
}

/*
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
*/
