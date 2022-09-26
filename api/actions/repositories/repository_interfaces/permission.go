package repository_interfaces

import (
	"api/models"
	"api/utils/pagination"
)

type PermissionRepository interface {
	GetAll(perPage, page int) ([]models.Permission, *pagination.Pagination, error)
}
