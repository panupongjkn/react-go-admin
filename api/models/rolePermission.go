package models

import (
	"time"

	"gorm.io/gorm"
)

type RolePermission struct {
	RoleID       uint `gorm:"primaryKey"`
	PermissionID uint `gorm:"primaryKey"`
	CreatedAt    time.Time
	DeletedAt    gorm.DeletedAt
}
