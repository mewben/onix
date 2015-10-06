package config

import "os"

var (
	Mode string
	Port string
)

func Setup(port string) {
	db_url := os.Getenv("DATABASE_URL")

	if db_url == "" {
		// dev mode
		Mode = "dev"
		Port = port
	} else {
		Mode = "prod"
		Port = ":" + os.Getenv("PORT")
	}
}
