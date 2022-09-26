package admin_handler_interfaces

type CreateAdminRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Role     uint   `json:"role" validate:"required"`
}

type EditAdminRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password"`
	Role     uint   `json:"role" validate:"required"`
}

type ChangePasswordAdminRequest struct {
	OldPassword        string `json:"old_password"`
	NewPassword        string `json:"new_password"`
	ConfirmNewPassword string `json:"confirm_new_password"`
}
