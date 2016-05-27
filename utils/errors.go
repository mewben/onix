package utils

const (
	E_SESSION_EXPIRED = "Session expired. Please login again."
	E_WRONG_CRED      = "Wrong username/password."
	E_USER_INACTIVE   = "User is not active."
	E502              = "Unexpected signing method. e502"
	E503              = "Authorization token invalid. e503"
)

type AppError struct {
	Error string
}

// returns AppError
// to be encoded to JSON
func ErrMarshal(err string) *AppError {
	e := AppError{
		Error: err,
	}

	return &e
}
