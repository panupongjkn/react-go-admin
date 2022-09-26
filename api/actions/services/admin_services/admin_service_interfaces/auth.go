package admin_service_interfaces

import "api/actions/handlers/admin_handlers/admin_handler_interfaces"

type AdminAuthService interface {
	Login(loginRequest admin_handler_interfaces.LoginRequest) (string, error)
}
