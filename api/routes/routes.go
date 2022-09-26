package routes

import (
	"api/routes/admin_routes"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Init(e *echo.Echo, db *gorm.DB) {
	API := e.Group("/api")
	adminAPI := API.Group("/admin")
	admin_routes.AuthRoutes(adminAPI, db)
	admin_routes.AdminRoutes(adminAPI, db)
	admin_routes.PermissionRoutes(adminAPI, db)
	admin_routes.RoleRoutes(adminAPI, db)
}
