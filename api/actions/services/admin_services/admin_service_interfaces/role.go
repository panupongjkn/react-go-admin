package admin_service_interfaces

import (
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/models"
	"api/utils/pagination"
)

type AdminRoleService interface {
	GetByID(id uint) (*models.Role, error)
	GetAll(perPage, page int) ([]models.Role, *pagination.Pagination, error)
	Create(createRoleRequest *admin_handler_interfaces.CreateRoleRequest) (*models.Role, error)
	Edit(id uint, editRoleRequest *admin_handler_interfaces.EditRoleRequest) (*models.Role, error)
	Delete(id uint) error
}
