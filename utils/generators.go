package utils

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"regexp"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateJWTToken(signing_key string, jwt_exp, iss int, role string) (response string, err error) {
	// Create jwt Token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set Claims
	token.Claims["iss"] = iss
	token.Claims["role"] = role
	token.Claims["exp"] = time.Now().Add(time.Minute * time.Duration(jwt_exp)).Unix()

	// Generate Encoded token
	response, err = token.SignedString([]byte(signing_key))
	return
}

// Generate 32bit token
func GenerateRandomToken() string {
	b := make([]byte, 16)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

// Generate Random ID
func GenerateId() int {
	n := big.NewInt(8609980)
	r, _ := rand.Int(rand.Reader, n)

	return int(r.Int64()) + 1200000
}

func Slugify(s string) string {
	var re = regexp.MustCompile("[^a-z0-9]+")

	return strings.Trim(re.ReplaceAllString(strings.ToLower(s), "-"), "-")
}
