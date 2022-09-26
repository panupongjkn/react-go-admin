package repository_interfaces

import (
	"api/models"
	"api/utils/pagination"
)

type AdminRepository interface {
	Update(admin *models.Admin) (*models.Admin, error)
	GetByID(id uint) (*models.Admin, error)
	Delete(id uint) error
	GetAll(perPage, page int) ([]models.Admin, *pagination.Pagination, error)
	FindByEmail(email string) (*models.Admin, error)
	Create(admin *models.Admin) (*models.Admin, error)
}
