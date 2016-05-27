package models

import (
	"strconv"

	"github.com/mewben/db-go-env"
)

func getSetting(key string) (value string, err error) {
	var (
		q = `
			SELECT value FROM ` + TSETTINGS + `
			WHERE key = $1;
		`
	)

	err = db.Conn.Get(&value, q, key)
	return
}

func GetSettingString(key string) (value string, err error) {
	value, err = getSetting(key)
	return
}

func GetSettingInt(key string) (value int, err error) {
	v, err := getSetting(key)
	if err != nil {
		return
	}

	// convert string to int
	value, err = strconv.Atoi(v)
	return
}
