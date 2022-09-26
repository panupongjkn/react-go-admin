package admin_handlers

import (
	"api/actions/handlers"
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/services/admin_services/admin_service_interfaces"
	"net/http"

	"github.com/labstack/echo/v4"
)

type adminAuthHandler struct {
	adminAuthService admin_service_interfaces.AdminAuthService
}

func NewAdminAuthHandler(adminAuthService admin_service_interfaces.AdminAuthService) adminAuthHandler {
	return adminAuthHandler{adminAuthService: adminAuthService}
}

func (h adminAuthHandler) Login(c echo.Context) error {
	request := new(admin_handler_interfaces.LoginRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	token, err := h.adminAuthService.Login(*request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"token": token,
	})
}
