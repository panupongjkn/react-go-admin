package admin_services

import (
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/repositories/repository_interfaces"
	"api/models"
	"api/utils/pagination"
)

type adminRoleService struct {
	roleRepository repository_interfaces.RoleRepository
}

func NewAdminRoleService(roleRepository repository_interfaces.RoleRepository) adminRoleService {
	return adminRoleService{roleRepository: roleRepository}
}

func (s adminRoleService) GetByID(id uint) (*models.Role, error) {
	role, err := s.roleRepository.GetByID(id)
	if err != nil {
		return nil, err
	}
	return role, nil
}

func (s adminRoleService) GetAll(perPage, page int) ([]models.Role, *pagination.Pagination, error) {
	roles, pagination, err := s.roleRepository.GetAll(perPage, page)
	if err != nil {
		return nil, nil, err
	}
	return roles, pagination, nil
}

func (s adminRoleService) Create(createRoleRequest *admin_handler_interfaces.CreateRoleRequest) (*models.Role, error) {
	permissions := []models.Permission{}
	for _, permission_id := range createRoleRequest.Permissions {
		permission := &models.Permission{
			ID: permission_id,
		}
		permissions = append(permissions, *permission)
	}
	role := &models.Role{
		Name:        createRoleRequest.Name,
		Code:        createRoleRequest.Code,
		Permissions: permissions,
	}
	role, err := s.roleRepository.Create(role)
	if err != nil {
		return nil, err
	}
	return role, nil
}

func (s adminRoleService) Edit(id uint, editRoleRequest *admin_handler_interfaces.EditRoleRequest) (*models.Role, error) {
	permissions := []models.Permission{}
	role, err := s.roleRepository.GetByID(id)
	if err != nil {
		return nil, err
	}
	for _, permission_id := range editRoleRequest.Permissions {
		permission := &models.Permission{
			ID: permission_id,
		}
		permissions = append(permissions, *permission)
	}
	role.Name = editRoleRequest.Name
	role.Code = editRoleRequest.Code
	role.Permissions = permissions
	role, err = s.roleRepository.Update(role)
	if err != nil {
		return nil, err
	}
	return role, nil
}

func (s adminRoleService) Delete(id uint) error {
	err := s.roleRepository.Delete(id)
	if err != nil {
		return err
	}
	return nil
}
