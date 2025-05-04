export type TResponse<T> = {
  status?: number
  message?: string
  data: T
  metadata?: TMetadata
}

export type TMetadata = TBaseFilter & {
  total_items?: number
  total_page?: number
  page: number
  per_page: number
  has_next_page?: boolean
  has_prev_page?: boolean
}

export type TBaseFilter = {
  search?: string
  sort_by?: string
  order?: string
}

export type UseFilterReturn = {
  filters: Record<string, any>
  pagination: PaginationFilter
  setFilters: (filters: Record<string, string>) => void
  handleChange: (
    customFilter?: CustomFilter<any>,
    // sorter?: DataTableSorter<any>,
    filters?: Record<string, any>,
    pagination?: DataTablePagination,
  ) => void
}
export type UseFilterProps = {
  options?: Options
  searchParams: URLSearchParams
  cb: UseTableFilterCb
}
type Options = {
  prefix?: string
}

export type UseTableFilterCb = (
  queryParams: string,
  context: Record<string, any>,
) => void
export type PaginationFilter = {
  page: number
  per_page: number
}

export type CustomFilter<X extends Record<string, unknown>> =
  | (X & {
      search?: string
    })
  | { search?: string }
export type DataTablePagination = {
  total?: number
  page?: number
  per_page?: number
}
// export type DataTableSorter<T extends Record<string, unknown>> = {
//   column?: ColumnType<T>;
//   order?: "DESC" | "ASC" | null;
//   field?: React.Key | readonly React.Key[];
//   sort?: string;
// };
