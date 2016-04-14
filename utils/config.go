// queries the config table for settings
package utils

import (
	"strconv"

	"github.com/mewben/db-go-env"
)

// env
func GetEnv() (conn db.Database, port string) {
	conn.DbHost = "server2.dev"
	conn.DbPort = "5432"
	conn.DbName = "onixdb"
	conn.DbUser = "mewben"
	conn.DbPass = "passwD"
	conn.SslMode = "disable"

	port = "localhost:1300"

	return
}

// generic
func getConfig(key string) (value string, err error) {
	var (
		q = `
			SELECT value
			FROM config
			WHERE key = $1;`
	)

	if err = db.Conn.Get(&value, q, key); err != nil {
		return
	}

	return
}

func GetConfigString(key string) (value string, err error) {
	value, err = getConfig(key)
	return
}

func GetConfigInt(key string) (value int, err error) {
	v, err := getConfig(key)
	if err != nil {
		return
	}

	// convert to int
	value, err = strconv.Atoi(v)

	return
}

func GetConfigFloat64(key string) (value float64, err error) {
	v, err := getConfig(key)
	if err != nil {
		return
	}

	// conver to float64
	value, err = strconv.ParseFloat(v, 64)

	return
}
