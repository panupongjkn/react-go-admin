package models

import (
	"time"

	"gorm.io/gorm"
)

type Role struct {
	ID uint `gorm:"primarykey"`

	Name      string `gorm:"unique"`
	Code      string `gorm:"unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Permissions []Permission `gorm:"many2many:role_permissions;"`
}

type RoleResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`

	Permissions []PermissionResponse `json:"permissions"`
}

func (m *Role) GetResponse() RoleResponse {
	permission := Permission{}
	permissionsRes := permission.GetResponses(m.Permissions)
	roleRes := RoleResponse{
		ID:          m.ID,
		Name:        m.Name,
		Code:        m.Code,
		Permissions: permissionsRes,
	}
	return roleRes
}

func (m *Role) GetResponses(roles []Role) []RoleResponse {
	rolesRes := []RoleResponse{}
	for _, role := range roles {
		roleRes := role.GetResponse()
		rolesRes = append(rolesRes, roleRes)
	}
	return rolesRes
}
