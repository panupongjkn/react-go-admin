package main

import (
	"api/database"
	"api/routes"
	"api/utils/validator"
	"log"
	"net/http"
	"os"

	goValidator "github.com/go-playground/validator"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func initENV() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("ERROR: loading .env file fail")
	}
}

func main() {
	initENV()
	db := database.Init()
	e := echo.New()
	//register validator
	validator := &validator.Validator{Validator: goValidator.New()}
	validator.InitOptionValidator()
	e.Validator = validator
	//middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))
	//routes
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome to API")
	})
	routes.Init(e, db)
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
