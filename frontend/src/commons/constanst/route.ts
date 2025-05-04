export const BASE_PATH = '/'

export const PAGE_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CATEGORY: {
    INDEX: '/category',
    CREATE: '/category/create',
    EDIT: '/category/edit',
  },
  PRODUCT: {
    INDEX: '/product',
    CREATE: '/product/create',
    EDIT: '/product/edit',
  },
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CATEGORY: {
    INDEX: '/category',
    CREATE: '/category',
    EDIT: '/category/edit',
    DETAIL: '/category/:id',
    DELETE: '/category/:id',
  },
  PRODUCT: {
    INDEX: '/products',
    CREATE: '/products',
    EDIT: '/products/edit',
    DETAIL: '/products/:id',
    DELETE: '/products/:id',
  },
}
