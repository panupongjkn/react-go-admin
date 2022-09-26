package jwt

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type AdminJWTClaims struct {
	ID uint `json:"id"`
	jwt.StandardClaims
}

func GetAdminJWTConfig() middleware.JWTConfig {
	config := middleware.JWTConfig{
		Claims:     &AdminJWTClaims{},
		SigningKey: []byte(os.Getenv("ADMIN_JWT_SIGNING_KEY")),
	}
	return config
}

func CreateAdminToken(id uint) (string, error) {
	claims := &AdminJWTClaims{
		id,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(os.Getenv("ADMIN_JWT_SIGNING_KEY")))
	if err != nil {
		return "", err
	}
	return t, nil
}

func GetAdminID(c echo.Context) uint {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*AdminJWTClaims)
	id := claims.ID
	return id
}

// type JWTClaims struct {
// 	ID uint `json:"id"`
// 	jwt.StandardClaims
// }

// func GetConfig() middleware.JWTConfig {
// 	config := middleware.JWTConfig{
// 		Claims:     &JWTClaims{},
// 		SigningKey: []byte(os.Getenv("JWT_SIGNING_KEY")),
// 	}
// 	return config
// }
