package validator

import (
	"api/errs"
	"encoding/json"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/go-playground/validator"
)

type Validator struct {
	Validator *validator.Validate
}

func (v *Validator) InitOptionValidator() {
	v.Validator.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
	v.Validator.RegisterValidation("date", func(fl validator.FieldLevel) bool {
		_, err := time.Parse("2006-01-02", fl.Field().String())
		return err == nil
	})
	// V.validator.RegisterValidation("phone", func(fl validator.FieldLevel) bool {
	// 	var re = regexp.MustCompile(`^[0-9]+$`)
	// 	return re.MatchString(fl.Field().String()) && (len(fl.Field().String()) == 10)
	// })
}

func (v *Validator) Validate(i interface{}) error {
	if err := v.Validator.Struct(i); err != nil {
		errorString := ""
		fieldsError := make(map[string]string)
		if castedObject, ok := err.(validator.ValidationErrors); ok {
			for _, err := range castedObject {
				message := ""
				switch err.Tag() {
				case "required":
					message = fmt.Sprintf("%s_IS_REQUIRED",
						strings.ToUpper(err.Field()))
				case "email":
					message = fmt.Sprintf("%s_IS_NOT_VALID_EMAIL",
						strings.ToUpper(err.Field()))
				case "date":
					message = fmt.Sprintf("%s_INVALID_DATE_FORMAT",
						strings.ToUpper(err.Field()))
				case "alphanum":
					message = fmt.Sprintf("%s_IS_NOT_VALID_NAME",
						strings.ToUpper(err.Field()))
				case "phone":
					message = fmt.Sprintf("%s_IS_NOT_PHONE_FORMAT",
						strings.ToUpper(err.Field()))
				}
				fieldsError[strings.ToLower(err.Field())] = message
			}
			fieldsErrorString, _ := json.Marshal(fieldsError)
			errorString = string(fieldsErrorString)
		}
		return errs.NewValidateError(401, errorString)
	}
	return nil
}
