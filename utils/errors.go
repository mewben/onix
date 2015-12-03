package utils

const (
	E502 = "Unexpected signing method. e502"
	E503 = "Authorization token invalid. e503"
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
