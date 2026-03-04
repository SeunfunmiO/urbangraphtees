// ─── PRODUCT TYPES ────────────────────────────────────────────────────────────

export type ProductCategory =
    | 'tees'
    | 'plain-tees'
    | 'hoodies'
    | 'joggers'
    | 'hats'
    | 'shirts'

export type ProductStatus = 'active' | 'draft' | 'archived'

export interface ProductVariant {
    size: string
    color: string
    colorHex: string
    stock: number
    sku: string
}

export interface ProductImage {
    url: string
    publicId: string
    alt: string
    isPrimary: boolean
    view: 'front' | 'back' | 'side' | 'detail'
}

export interface Product {
    _id: string
    name: string
    slug: string
    description: string
    category: ProductCategory
    price: number
    compareAtPrice?: number
    images: ProductImage[]
    variants: ProductVariant[]
    tags: string[]
    isCustomizable: boolean
    isFeatured: boolean
    status: ProductStatus
    soldCount: number
    views: number
    createdAt: string
    updatedAt: string
}

export interface ProductFilters {
    category?: ProductCategory
    minPrice?: number
    maxPrice?: number
    sizes?: string[]
    colors?: string[]
    sort?: 'newest' | 'price-asc' | 'price-desc' | 'popular'
    search?: string
    page?: number
    limit?: number
}

export interface ProductsResponse {
    products: Product[]
    total: number
    page: number
    totalPages: number
}