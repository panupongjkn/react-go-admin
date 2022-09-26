package repositories

import (
	"api/models"
	"api/utils/pagination"

	"gorm.io/gorm"
)

type adminRepositoryDB struct {
	db *gorm.DB
}

func NewAdminRepositoryDB(db *gorm.DB) adminRepositoryDB {
	return adminRepositoryDB{db: db}
}

func (r adminRepositoryDB) GetByID(id uint) (*models.Admin, error) {
	admin := models.Admin{}
	result := r.db.Preload("Role").Preload("Role.Permissions").Where("id = ?", id).Find(&admin)
	if result.Error != nil {
		return nil, result.Error
	}
	return &admin, nil
}

func (r adminRepositoryDB) GetAll(perPage, page int) ([]models.Admin, *pagination.Pagination, error) {
	roleSuperAdmin := &models.Role{}
	result := r.db.Where("code = ?", "SUPER_ADMIN").First(&roleSuperAdmin)
	if result.Error != nil {
		return nil, nil, result.Error
	}
	admins := []models.Admin{}
	result = r.db.Not("role_id = ?", roleSuperAdmin.ID).Preload("Role").Preload("Role.Permissions").Limit(perPage).Offset((page - 1) * perPage).Find(&admins)
	if result.Error != nil {
		return nil, nil, result.Error
	}
	adminAll := []models.Admin{}
	resultAll := r.db.Find(&adminAll)
	if resultAll.Error != nil {
		return nil, nil, resultAll.Error
	}
	pagination := pagination.GetPagination(resultAll, page, perPage)
	return admins, &pagination, nil
}

func (r adminRepositoryDB) FindByEmail(email string) (*models.Admin, error) {
	admin := models.Admin{}
	result := r.db.Where("email = ?", email).First(&admin)
	if result.Error != nil {
		return nil, result.Error
	}
	return &admin, nil
}

func (r adminRepositoryDB) Create(admin *models.Admin) (*models.Admin, error) {
	result := r.db.Create(&admin)
	if result.Error != nil {
		return nil, result.Error
	}
	return admin, nil
}

func (r adminRepositoryDB) Update(admin *models.Admin) (*models.Admin, error) {
	result := r.db.Save(&admin)
	if result.Error != nil {
		return nil, result.Error
	}
	return admin, nil
}

func (r adminRepositoryDB) Delete(id uint) error {
	admin := models.Admin{}
	result := r.db.Where("id = ?", id).Delete(&admin)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
