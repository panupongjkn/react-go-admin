package admin_services

import (
	"api/actions/repositories/repository_interfaces"
	"api/models"
	"api/utils/pagination"
)

type adminPermissionService struct {
	permissionRepository repository_interfaces.PermissionRepository
}

func NewAdminPermissionService(permissionRepository repository_interfaces.PermissionRepository) adminPermissionService {
	return adminPermissionService{permissionRepository: permissionRepository}
}

func (s adminPermissionService) GetAll(perPage, page int) ([]models.Permission, *pagination.Pagination, error) {
	permissions, pagination, err := s.permissionRepository.GetAll(perPage, page)
	if err != nil {
		return nil, nil, err
	}
	return permissions, pagination, nil
}
