package repositories

import (
	"api/models"
	"api/utils/pagination"

	"gorm.io/gorm"
)

type permissionRepositoryDB struct {
	db *gorm.DB
}

func NewPermissionRepositoryDB(db *gorm.DB) permissionRepositoryDB {
	return permissionRepositoryDB{db: db}
}

func (r permissionRepositoryDB) GetAll(perPage, page int) ([]models.Permission, *pagination.Pagination, error) {
	permissions := []models.Permission{}
	result := r.db.Limit(perPage).Offset((page - 1) * perPage).Find(&permissions)
	if result.Error != nil {
		return nil, nil, result.Error
	}
	permissionAll := []models.Permission{}
	resultAll := r.db.Find(&permissionAll)
	if resultAll.Error != nil {
		return nil, nil, resultAll.Error
	}
	pagination := pagination.GetPagination(resultAll, page, perPage)
	return permissions, &pagination, nil
}
