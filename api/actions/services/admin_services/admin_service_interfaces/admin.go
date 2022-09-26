package admin_service_interfaces

import (
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/models"
	"api/utils/pagination"
)

type AdminAdminService interface {
	GetByID(id uint) (*models.Admin, error)
	GetAll(perPage, page int) ([]models.Admin, *pagination.Pagination, error)
	Create(createAdminRequest *admin_handler_interfaces.CreateAdminRequest) (*models.Admin, error)
	ChangePassword(id uint, changePasswordAdminRequest *admin_handler_interfaces.ChangePasswordAdminRequest) (*models.Admin, error)
	Edit(id uint, editAdminRequest *admin_handler_interfaces.EditAdminRequest) (*models.Admin, error)
	Delete(id uint) error
}
