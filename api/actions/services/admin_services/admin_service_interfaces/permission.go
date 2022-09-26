package admin_service_interfaces

import (
	"api/models"
	"api/utils/pagination"
)

type AdminPermissionService interface {
	GetAll(perPage, page int) ([]models.Permission, *pagination.Pagination, error)
}
