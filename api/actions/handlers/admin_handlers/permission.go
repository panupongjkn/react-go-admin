package admin_handlers

import (
	"api/actions/handlers"
	"api/actions/services/admin_services/admin_service_interfaces"
	"api/models"
	"strconv"

	"github.com/labstack/echo/v4"
)

type adminPermissionHandler struct {
	adminPermissionService admin_service_interfaces.AdminPermissionService
}

func NewAdminPermissionHandler(adminPermissionService admin_service_interfaces.AdminPermissionService) adminPermissionHandler {
	return adminPermissionHandler{adminPermissionService: adminPermissionService}
}

func (h adminPermissionHandler) GetAll(c echo.Context) error {
	perPage, err := strconv.Atoi(c.QueryParam("perPage"))
	if err != nil {
		perPage = 10
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		page = 1
	}
	permissions, pagination, err := h.adminPermissionService.GetAll(perPage, page)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	permission := models.Permission{}
	return handlers.HandleDataList(c, 200, permission.GetResponses(permissions), *pagination)
}
