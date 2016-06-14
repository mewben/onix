package utils

// Error Constants
const (
	E_DATEINVALID     = "Date is invalid."
	E_SESSION_EXPIRED = "Session expired. Please login again."
	E_WRONG_CRED      = "Wrong username/password."
	E_USER_INACTIVE   = "User is not active."
	E_ID_NOT_MATCH    = "Id not match"
	E_500             = "Server error."
	E502              = "Unexpected signing method. e502"
	E503              = "Authorization token invalid. e503"
)

// AppError struct
type AppError struct {
	Error string
}

// ErrMarshal function to format json error response
// returns AppError
// to be encoded to JSON
func ErrMarshal(err string) *AppError {
	e := AppError{
		Error: err,
	}

	return &e
}
