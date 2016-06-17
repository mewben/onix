package middleware

import (
	"net"
	"strconv"
	"time"

	"github.com/jaredfolkins/badactor"
	"github.com/labstack/echo"

	"projects/onix/utils"
)

var (
	// LoginRule default rule
	LoginRule = &badactor.Rule{
		Name:        "Login",
		Message:     "You have failed to login too many times.",
		StrikeLimit: utils.STStrikeLimit,
		ExpireBase:  time.Second * time.Duration(utils.STExpireBase),
		Sentence:    time.Minute * time.Duration(utils.STSentence),
		Action:      &JailerAction{},
	}
)

// JailerAction struct
type JailerAction struct{}

// WhenJailed action
func (ma *JailerAction) WhenJailed(a *badactor.Actor, r *badactor.Rule) error {
	// Do something here. Log, email, etc...
	return nil
}

// WhenTimeServed action
func (ma *JailerAction) WhenTimeServed(a *badactor.Actor, r *badactor.Rule) error {
	// Do something here. Log, email, etc...
	return nil
}

// Jailer login
func Jailer(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// snag the IP for use as the actor's name
		an, _, err := net.SplitHostPort(c.Request().RemoteAddress())
		if err != nil {
			return c.JSON(400, utils.ErrMarshal(err.Error()))
		}

		// if the Actor is jailed, send them StatusUnauthorized
		if utils.ST.IsJailed(an) {
			return c.JSON(400, utils.ErrMarshal("Too many login attempts. Please try again in "+strconv.Itoa(utils.STSentence)+" minutes."))
		}

		// call the next middleware in the chain
		return next(c)
	}
}
