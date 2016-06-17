package utils

// queries the config table for settings

import (
	"strconv"

	"github.com/jaredfolkins/badactor"
	"github.com/mewben/db-go-env"
)

// ST badactor studio
var ST *badactor.Studio
var STStrikeLimit = 10
var STExpireBase = 60 // 10 attempts ever 1 second
var STSentence = 5    // try again in 5 minutes

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

// GetConfigString string config
func GetConfigString(key string) (value string, err error) {
	value, err = getConfig(key)
	return
}

// GetConfigInt int config
func GetConfigInt(key string) (value int, err error) {
	v, err := getConfig(key)
	if err != nil {
		return
	}

	// convert to int
	value, err = strconv.Atoi(v)

	return
}

// GetConfigFloat64 float64
func GetConfigFloat64(key string) (value float64, err error) {
	v, err := getConfig(key)
	if err != nil {
		return
	}

	// conver to float64
	value, err = strconv.ParseFloat(v, 64)

	return
}
