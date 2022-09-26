package errs

import (
	"net/http"
)

type AppError struct {
	Code    int
	Message string
}

type ValidateError struct {
	Code   int
	Fields string
}

func (e AppError) Error() string {
	return e.Message
}

func (e ValidateError) Error() string {
	return e.Fields
}

func NewValidateError(code int, fields string) error {
	return ValidateError{
		Code:   code,
		Fields: fields,
	}
}

func NewError(code int, message string) error {
	return AppError{
		Code:    code,
		Message: message,
	}
}

func NewNotFoundError(message string) error {
	return AppError{
		Code:    http.StatusNotFound,
		Message: message,
	}
}

func NewInternalServerError() error {
	return AppError{
		Code:    http.StatusInternalServerError,
		Message: "unexpected error",
	}
}
