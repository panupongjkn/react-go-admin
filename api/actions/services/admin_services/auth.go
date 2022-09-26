package admin_services

import (
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/repositories/repository_interfaces"
	"api/utils/hash"
	"api/utils/jwt"
	"errors"
)

type adminAuthService struct {
	adminRepository repository_interfaces.AdminRepository
}

func NewAdminAuthService(adminRepository repository_interfaces.AdminRepository) adminAuthService {
	return adminAuthService{adminRepository: adminRepository}
}

func (s adminAuthService) Login(loginRequest admin_handler_interfaces.LoginRequest) (string, error) {
	admin, err := s.adminRepository.FindByEmail(loginRequest.Email)
	if err != nil {
		return "", errors.New("email or password are incorrect")
	}
	correct := hash.CheckHash(admin.Password, loginRequest.Password)
	if !correct {
		return "", errors.New("email or password are incorrect")
	}
	token, err := jwt.CreateAdminToken(admin.ID)
	if err != nil {
		return "", errors.New("generate token error")
	}
	return token, nil
}
