package utils

import (
	"regexp"
	"strings"

	"github.com/satori/go.uuid"
)

func GenerateUUID() string {
	// Create UUID version 4
	return uuid.NewV4().String()
}

func Slugify(s string) string {
	var re = regexp.MustCompile("[^a-z0-9]+")

	return strings.Trim(re.ReplaceAllString(strings.ToLower(s), "-"), "-")
}
