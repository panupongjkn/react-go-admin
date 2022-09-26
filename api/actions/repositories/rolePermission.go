package repositories

import (
	"api/models"

	"gorm.io/gorm"
)

type rolePermissionRepositoryDB struct {
	db *gorm.DB
}

func NewRolePermissionRepositoryDB(db *gorm.DB) rolePermissionRepositoryDB {
	return rolePermissionRepositoryDB{db: db}
}

func (r rolePermissionRepositoryDB) DeleteAllByRole(role_id uint) error {
	rolePermission := models.RolePermission{}
	result := r.db.Where("role_id = ?", role_id).Delete(&rolePermission)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
