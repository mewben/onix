package db

import (
	"os"

	"github.com/jmoiron/sqlx"
)

type Database struct {
	DbHost  string
	DbPort  string
	DbName  string
	DbUser  string
	DbPass  string
	SslMode string
}

// Global DB
var Conn *sqlx.DB

func Setup(db Database) {
	db_url := os.Getenv("DATABASE_URL")

	if db_url == "" {
		// dev mode
		// manually setup connection string
		db_url = `host=` + db.DbHost + ` ` +
			`port=` + db.DbPort + ` ` +
			`dbname=` + db.DbName + ` ` +
			`user=` + db.DbUser + ` ` +
			`password=` + db.DbPass + ` ` +
			`sslmode=` + db.SslMode
	}

	// connect to database
	registerDatabase(db_url)
}

func registerDatabase(db_url string) {
	Conn = sqlx.MustConnect("postgres", db_url)
	Conn = Conn.Unsafe()
}
