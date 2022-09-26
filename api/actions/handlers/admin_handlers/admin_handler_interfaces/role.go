package admin_handler_interfaces

type CreateRoleRequest struct {
	Name        string `json:"name" validate:"required"`
	Code        string `json:"code" validate:"required"`
	Permissions []uint `json:"permissions" validate:"required"`
}

type EditRoleRequest struct {
	Name        string `json:"name" validate:"required"`
	Code        string `json:"code" validate:"required"`
	Permissions []uint `json:"permissions" validate:"required"`
}
