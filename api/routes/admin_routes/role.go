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

func RoleRoutes(adminApi *echo.Group, db *gorm.DB) {
	roleRepository := repositories.NewRoleRepositoryDB(db)
	adminRoleService := admin_services.NewAdminRoleService(roleRepository)
	adminRoleHandler := admin_handlers.NewAdminRoleHandler(adminRoleService)

	adminRoleAPI := adminApi.Group("/role")
	config := jwt.GetAdminJWTConfig()
	adminRoleAPI.Use(middleware.JWTWithConfig(config))
	adminRoleAPI.GET("/list", adminRoleHandler.GetAll)
	adminRoleAPI.POST("/create", adminRoleHandler.Create)
	adminRoleAPI.GET("/:id", adminRoleHandler.GetDetail)
	adminRoleAPI.PUT("/:id", adminRoleHandler.Edit)
	adminRoleAPI.DELETE("/:id", adminRoleHandler.Delete)
}
