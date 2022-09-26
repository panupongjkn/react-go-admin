package repository_interfaces

type RolePermissionRepository interface {
	DeleteAllByRole(role_id uint) error
}
