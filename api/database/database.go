package database

import (
	"api/models"
	"errors"
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Init() *gorm.DB {
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbDomain := os.Getenv("DB_DOMAIN")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local",
		dbUsername,
		dbPassword,
		dbDomain,
		dbPort,
		dbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	migration(db)
	return db
}

func migration(db *gorm.DB) {
	db.AutoMigrate(
		models.Permission{},
		models.Role{},
		models.RolePermission{},
		models.Admin{},
	)
	seed(db)
}

func seed(db *gorm.DB) {
	if err := db.AutoMigrate(&models.Permission{}); err == nil && db.Migrator().HasTable(&models.Permission{}) {
		if err := db.First(&models.Permission{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			manageAdminPermission := &models.Permission{
				Name: "Manage Admin",
				Code: "MANAGE_ADMIN",
			}
			db.Create(&manageAdminPermission)
			manageUserPermission := &models.Permission{
				Name: "Manage User",
				Code: "MANAGE_USER",
			}
			db.Create(&manageUserPermission)
			if err := db.AutoMigrate(&models.Role{}); err == nil && db.Migrator().HasTable(&models.Role{}) {
				if err := db.First(&models.Role{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
					superAdminRole := &models.Role{
						Name: "Super Admin",
						Code: "SUPER_ADMIN",
						Permissions: []models.Permission{
							*manageAdminPermission,
							*manageUserPermission,
						},
					}
					db.Create(&superAdminRole)
					if err := db.AutoMigrate(&models.Admin{}); err == nil && db.Migrator().HasTable(&models.Admin{}) {
						if err := db.First(&models.Admin{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
							superAdmin := &models.Admin{
								Email:    "super_admin@mail.com",
								Password: "$2a$14$cRgSZZj3fy3ictg7s/u2FeSq0yCOn3UbOad4a84gzlGpri2omhCF2", //p@ssw0rd!
								Role:     *superAdminRole,
							}
							db.Create(&superAdmin)
						}
					}
				}
			}
		}
	}
}
