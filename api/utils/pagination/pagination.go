package pagination

import "gorm.io/gorm"

type Pagination struct {
	Page      int `json:"page"`
	TotalPage int `json:"total_page"`
	TotalItem int `json:"total_item"`
}

func GetPagination(result *gorm.DB, page, perPage int) Pagination {
	totalPage := int(result.RowsAffected) / perPage
	if int(result.RowsAffected)%perPage > 0 {
		totalPage += 1
	}
	pagination := Pagination{
		Page:      page,
		TotalPage: totalPage,
		TotalItem: int(result.RowsAffected),
	}
	return pagination
}
