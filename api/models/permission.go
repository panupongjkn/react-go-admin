package models

import (
	"time"

	"gorm.io/gorm"
)

type Permission struct {
	ID        uint   `gorm:"primarykey"`
	Name      string `gorm:"unique"`
	Code      string `gorm:"unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type PermissionResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

func (m *Permission) GetResponse() PermissionResponse {
	permissionRes := PermissionResponse{
		ID:   m.ID,
		Name: m.Name,
		Code: m.Code,
	}
	return permissionRes
}

func (m *Permission) GetResponses(permissions []Permission) []PermissionResponse {
	permissionsRes := []PermissionResponse{}
	for _, permission := range permissions {
		permissionRes := permission.GetResponse()
		permissionsRes = append(permissionsRes, permissionRes)
	}
	return permissionsRes
}
