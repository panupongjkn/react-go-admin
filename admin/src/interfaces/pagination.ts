export interface IPagination {
  page: number;
  total_item: number;
  total_page: number;
}

export interface IPaginationRequest {
  page: number;
  per_page: number;
}
