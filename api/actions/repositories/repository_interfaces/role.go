package repository_interfaces

import (
	"api/models"
	"api/utils/pagination"
)

type RoleRepository interface {
	GetAll(perPage, page int) ([]models.Role, *pagination.Pagination, error)
	GetByID(id uint) (*models.Role, error)
	Delete(id uint) error
	Create(role *models.Role) (*models.Role, error)
	Update(role *models.Role) (*models.Role, error)
}
