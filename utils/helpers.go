package utils

import (
	"errors"
	"strings"
	"time"
	"unicode"
)

// ParseDate datestring
func ParseDate(form, date string) (pd time.Time, err error) {
	// +08 is the numeric timezone
	// TODO: get this value from the settings
	date = date + " +08"
	pd, err = time.Parse(form, date)
	if err != nil {
		err = errors.New(E_DATEINVALID)
	}

	return
}

// GenerateSlug function
func GenerateSlug(str string) (slug string) {
	return strings.Map(func(r rune) rune {
		switch {
		case r == ' ', r == '-':
			return '-'
		case r == '_', unicode.IsLetter(r), unicode.IsDigit(r):
			return r
		default:
			return -1
		}
	}, strings.ToLower(strings.TrimSpace(str)))
}
