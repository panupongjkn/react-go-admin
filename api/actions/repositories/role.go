package repositories

import (
	"api/models"
	"api/utils/pagination"
	"errors"

	"gorm.io/gorm"
)

type roleRepositoryDB struct {
	db *gorm.DB
}

func NewRoleRepositoryDB(db *gorm.DB) roleRepositoryDB {
	return roleRepositoryDB{db: db}
}

func (r roleRepositoryDB) GetByID(id uint) (*models.Role, error) {
	role := models.Role{}
	result := r.db.Preload("Permissions").Where("id = ?", id).Find(&role)
	if result.Error != nil {
		return nil, result.Error
	}
	return &role, nil
}

func (r roleRepositoryDB) GetAll(perPage, page int) ([]models.Role, *pagination.Pagination, error) {
	roles := []models.Role{}
	result := r.db.Not("code = ?", "SUPER_ADMIN").Preload("Permissions").Limit(perPage).Offset((page - 1) * perPage).Find(&roles)
	if result.Error != nil {
		return nil, nil, result.Error
	}
	roleAll := []models.Role{}
	resultAll := r.db.Find(&roleAll)
	if resultAll.Error != nil {
		return nil, nil, resultAll.Error
	}
	pagination := pagination.GetPagination(resultAll, page, perPage)
	return roles, &pagination, nil
}

func (r roleRepositoryDB) Create(role *models.Role) (*models.Role, error) {
	result := r.db.Create(&role)
	if result.Error != nil {
		return nil, result.Error
	}
	return role, nil
}

func (r roleRepositoryDB) Update(role *models.Role) (*models.Role, error) {
	tx := r.db.Begin()
	result := tx.Where("role_id = ?", role.ID).Unscoped().Delete(&models.RolePermission{})
	if result.Error != nil {
		tx.Rollback()
		return nil, result.Error
	}
	for _, permission := range role.Permissions {
		rolePermissionModel := &models.RolePermission{
			RoleID:       role.ID,
			PermissionID: permission.ID,
		}
		result = tx.Create(&rolePermissionModel)
		if result.Error != nil {
			tx.Rollback()
			return nil, result.Error
		}
	}
	result = tx.Save(role)
	if result.Error != nil {
		tx.Rollback()
		return nil, result.Error
	}
	tx.Commit()
	return role, nil
}

func (r roleRepositoryDB) Delete(id uint) error {
	tx := r.db.Begin()
	admins := []models.Admin{}
	result := tx.Where("role_id = ?", id).Find(&admins)
	if result.Error != nil {
		return result.Error
	}
	if len(admins) > 0 {
		return errors.New("Has admin use this role. Please change role admin before delete.")
	}
	result = tx.Where("role_id = ?", id).Unscoped().Delete(&models.RolePermission{})
	if result.Error != nil {
		tx.Rollback()
		return result.Error
	}
	role := models.Role{}
	resultDeleteRole := tx.Where("id = ?", id).Delete(&role)
	if resultDeleteRole.Error != nil {
		tx.Rollback()
		return resultDeleteRole.Error
	}
	tx.Commit()
	return nil
}
