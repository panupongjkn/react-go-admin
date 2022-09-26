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

func AdminRoutes(adminApi *echo.Group, db *gorm.DB) {
	adminRepository := repositories.NewAdminRepositoryDB(db)
	adminAdminService := admin_services.NewAdminAdminService(adminRepository)
	adminAdminHandler := admin_handlers.NewAdminAdminHandler(adminAdminService)

	adminAdminAPI := adminApi.Group("/admin")
	config := jwt.GetAdminJWTConfig()
	adminAdminAPI.Use(middleware.JWTWithConfig(config))
	adminAdminAPI.GET("/list", adminAdminHandler.GetAll)
	adminAdminAPI.GET("/detail", adminAdminHandler.GetDetailByToken)
	adminAdminAPI.GET("/:id", adminAdminHandler.GetDetail)
	adminAdminAPI.PUT("/:id", adminAdminHandler.Edit)
	adminAdminAPI.DELETE("/:id", adminAdminHandler.Delete)
	adminAdminAPI.POST("/create", adminAdminHandler.Create)
	adminAdminAPI.PUT("/change-password", adminAdminHandler.ChangePassword)
}
