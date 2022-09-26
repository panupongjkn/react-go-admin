package admin_services

import (
	"api/actions/handlers/admin_handlers/admin_handler_interfaces"
	"api/actions/repositories/repository_interfaces"
	"api/models"
	"api/utils/hash"
	"api/utils/pagination"
	"errors"
)

type adminAdminService struct {
	adminRepository repository_interfaces.AdminRepository
}

func NewAdminAdminService(adminRepository repository_interfaces.AdminRepository) adminAdminService {
	return adminAdminService{adminRepository: adminRepository}
}

func (s adminAdminService) GetByID(id uint) (*models.Admin, error) {
	admin, err := s.adminRepository.GetByID(id)
	if err != nil {
		return nil, err
	}
	if admin.ID == 0 {
		return nil, errors.New("Admin not found")
	}
	return admin, nil
}

func (s adminAdminService) GetAll(perPage, page int) ([]models.Admin, *pagination.Pagination, error) {
	admins, pagination, err := s.adminRepository.GetAll(perPage, page)
	if err != nil {
		return nil, nil, err
	}
	return admins, pagination, nil
}

func (s adminAdminService) Create(createAdminRequest *admin_handler_interfaces.CreateAdminRequest) (*models.Admin, error) {
	hashPassword, err := hash.Hash(createAdminRequest.Password)
	if err != nil {
		return nil, err
	}
	admin := &models.Admin{
		Email:    createAdminRequest.Email,
		Password: hashPassword,
		RoleID:   createAdminRequest.Role,
	}
	admin, err = s.adminRepository.Create(admin)
	if err != nil {
		return nil, err
	}
	return admin, nil
}

func (s adminAdminService) Edit(id uint, editAdminRequest *admin_handler_interfaces.EditAdminRequest) (*models.Admin, error) {
	admin, err := s.adminRepository.GetByID((id))
	if err != nil {
		return nil, err
	}
	admin.Email = editAdminRequest.Email
	admin.RoleID = editAdminRequest.Role
	admin.Role = models.Role{}
	if editAdminRequest.Password != "" {
		hashPassword, err := hash.Hash(editAdminRequest.Password)
		if err != nil {
			return nil, err
		}
		admin.Password = hashPassword
	}
	admin, err = s.adminRepository.Update(admin)
	if err != nil {
		return nil, err
	}
	return admin, nil
}

func (s adminAdminService) Delete(id uint) error {
	err := s.adminRepository.Delete(id)
	if err != nil {
		return err
	}
	return nil
}

func (s adminAdminService) ChangePassword(id uint, changePasswordAdminRequest *admin_handler_interfaces.ChangePasswordAdminRequest) (*models.Admin, error) {
	if changePasswordAdminRequest.NewPassword != changePasswordAdminRequest.ConfirmNewPassword {
		return nil, errors.New("รหัสผ่านใหม่ไม่ตรงกัน")
	}
	admin, err := s.adminRepository.GetByID((id))
	if err != nil {
		return nil, err
	}
	passwordValid := hash.CheckHash(admin.Password, changePasswordAdminRequest.OldPassword)
	if !passwordValid {
		return nil, errors.New("รหัสผ่านเก่าไม่ถูกต้อง")
	}
	hashPassword, err := hash.Hash(changePasswordAdminRequest.NewPassword)
	if err != nil {
		return nil, err
	}
	admin.Password = hashPassword
	admin, err = s.adminRepository.Update(admin)
	if err != nil {
		return nil, err
	}
	return admin, nil
}
