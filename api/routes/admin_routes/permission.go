package admin_routes

import (
	"api/actions/handlers/admin_handlers"
	"api/actions/repositories"
	"api/actions/services/admin_services"
	"api/utils/jwt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func PermissionRoutes(adminApi *echo.Group, db *gorm.DB) {
	permissionRepository := repositories.NewPermissionRepositoryDB(db)
	adminPermissionService := admin_services.NewAdminPermissionService(permissionRepository)
	adminPermissionHandler := admin_handlers.NewAdminPermissionHandler(adminPermissionService)

	adminPermissionAPI := adminApi.Group("/permission")
	config := jwt.GetAdminJWTConfig()
	adminPermissionAPI.Use(middleware.JWTWithConfig(config))
	adminPermissionAPI.GET("/list", adminPermissionHandler.GetAll)
	// adminPermissionAPI.GET("/detail", adminAdminHandler.GetDetailByToken)
}
