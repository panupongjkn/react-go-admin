package models

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	ID        uint `gorm:"primarykey"`
	Email     string
	Password  string
	RoleID    uint
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	Role Role
}

type AdminResponse struct {
	ID    uint         `json:"id"`
	Email string       `json:"email"`
	Role  RoleResponse `json:"role"`
}

func (m *Admin) GetResponse() AdminResponse {
	adminRes := AdminResponse{
		ID:    m.ID,
		Email: m.Email,
		Role:  m.Role.GetResponse(),
	}
	return adminRes
}

func (m *Admin) GetResponses(admins []Admin) []AdminResponse {
	adminsRes := []AdminResponse{}
	for _, admin := range admins {
		adminRes := admin.GetResponse()
		adminsRes = append(adminsRes, adminRes)
	}
	return adminsRes
}
