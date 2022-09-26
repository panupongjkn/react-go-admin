package admin_routes

import (
	"api/actions/handlers/admin_handlers"
	"api/actions/repositories"
	"api/actions/services/admin_services"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func AuthRoutes(adminApi *echo.Group, db *gorm.DB) {
	adminRepository := repositories.NewAdminRepositoryDB(db)
	adminAuthService := admin_services.NewAdminAuthService(adminRepository)
	adminAuthHandler := admin_handlers.NewAdminAuthHandler(adminAuthService)

	adminAuthAPI := adminApi.Group("/auth")
	adminAuthAPI.POST("/login", adminAuthHandler.Login)
}
