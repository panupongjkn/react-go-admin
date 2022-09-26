package handlers

import (
	"api/errs"
	"api/utils/pagination"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

func HandleError(c echo.Context, err error) error {
	switch e := err.(type) {
	case errs.AppError:
		return Handle(c, e.Code, e.Message, nil)
	case errs.ValidateError:
		fileds := new(map[string]string)
		err := json.Unmarshal([]byte(e.Fields), fileds)
		if err != nil {
			return Handle(c, http.StatusInternalServerError, e.Error(), nil)
		}
		return c.JSON(e.Code, echo.Map{
			"message": "",
			"fields":  fileds,
		})
	case error:
		return Handle(c, http.StatusInternalServerError, e.Error(), nil)
	}
	return Handle(c, http.StatusInternalServerError, "Internal server error", nil)
}

func Handle(c echo.Context, status int, message string, data interface{}) error {
	return c.JSON(status, echo.Map{
		"message": message,
		"data":    data,
	})
}

func HandleDataList(c echo.Context, status int, data interface{}, pagination pagination.Pagination) error {
	return c.JSON(status, echo.Map{
		"pagination": pagination,
		"data":       data,
	})
}
