package admin_handlers

import (
	"api/actions/handlers"
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/services/admin_services/admin_service_interfaces"
	"api/models"
	"strconv"

	"github.com/labstack/echo/v4"
)

type adminRoleHandler struct {
	adminRoleService admin_service_interfaces.AdminRoleService
}

func NewAdminRoleHandler(adminRoleService admin_service_interfaces.AdminRoleService) adminRoleHandler {
	return adminRoleHandler{adminRoleService: adminRoleService}
}

func (h adminRoleHandler) GetDetail(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	admin, err := h.adminRoleService.GetByID(uint(id))
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "", admin.GetResponse())
}

func (h adminRoleHandler) GetAll(c echo.Context) error {
	perPage, err := strconv.Atoi(c.QueryParam("perPage"))
	if err != nil {
		perPage = 10
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		page = 1
	}
	roles, pagination, err := h.adminRoleService.GetAll(perPage, page)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	role := models.Role{}
	return handlers.HandleDataList(c, 200, role.GetResponses(roles), *pagination)
}

func (h adminRoleHandler) Create(c echo.Context) error {
	request := new(admin_handler_interfaces.CreateRoleRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	role, err := h.adminRoleService.Create(request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Create role success", role.ID)
}

func (h adminRoleHandler) Edit(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	request := new(admin_handler_interfaces.EditRoleRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	role, err := h.adminRoleService.Edit(uint(id), request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Edit role success", role.ID)
}

func (h adminRoleHandler) Delete(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	err = h.adminRoleService.Delete(uint(id))
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Delete role success", nil)
}
