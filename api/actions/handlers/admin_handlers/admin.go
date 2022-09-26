package admin_handlers

import (
	"api/actions/handlers"
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/services/admin_services/admin_service_interfaces"
	"api/models"
	"api/utils/jwt"
	"strconv"

	"github.com/labstack/echo/v4"
)

type adminAdminHandler struct {
	adminAdminService admin_service_interfaces.AdminAdminService
}

func NewAdminAdminHandler(adminAdminService admin_service_interfaces.AdminAdminService) adminAdminHandler {
	return adminAdminHandler{adminAdminService: adminAdminService}
}

func (h adminAdminHandler) GetDetailByToken(c echo.Context) error {
	id := jwt.GetAdminID(c)
	admin, err := h.adminAdminService.GetByID(id)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "", admin.GetResponse())
}

func (h adminAdminHandler) GetDetail(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	admin, err := h.adminAdminService.GetByID(uint(id))
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "", admin.GetResponse())
}

func (h adminAdminHandler) GetAll(c echo.Context) error {
	perPage, err := strconv.Atoi(c.QueryParam("perPage"))
	if err != nil {
		perPage = 10
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil {
		page = 1
	}
	admins, pagination, err := h.adminAdminService.GetAll(perPage, page)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	admin := models.Admin{}
	return handlers.HandleDataList(c, 200, admin.GetResponses(admins), *pagination)
}

func (h adminAdminHandler) Create(c echo.Context) error {
	request := new(admin_handler_interfaces.CreateAdminRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	admin, err := h.adminAdminService.Create(request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Create admin success", admin.ID)
}

func (h adminAdminHandler) Edit(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	request := new(admin_handler_interfaces.EditAdminRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	admin, err := h.adminAdminService.Edit(uint(id), request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Edit admin success", admin.ID)
}

func (h adminAdminHandler) Delete(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return c.JSON(500, err.Error())
	}
	err = h.adminAdminService.Delete(uint(id))
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Delete admin success", nil)
}

func (h adminAdminHandler) ChangePassword(c echo.Context) error {
	id := jwt.GetAdminID(c)
	request := new(admin_handler_interfaces.ChangePasswordAdminRequest)
	if err := c.Bind(request); err != nil {
		return handlers.HandleError(c, err)
	}
	if err := c.Validate(request); err != nil {
		return handlers.HandleError(c, err)
	}
	admin, err := h.adminAdminService.ChangePassword(id, request)
	if err != nil {
		return handlers.HandleError(c, err)
	}
	return handlers.Handle(c, 200, "Change password success", admin.ID)
}
