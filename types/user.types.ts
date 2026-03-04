// ─── USER TYPES ───────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'admin'

export interface UserAddress {
    _id?: string
    label: string   // e.g. "Home", "Office"
    firstName: string
    lastName: string
    phone: string
    street: string
    city: string
    state: string
    country: string
    postalCode: string
    isDefault: boolean
}

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
    role: UserRole
    addresses: UserAddress[]
    wishlist: string[]   // Product IDs
    emailVerified: boolean
    createdAt: string
    updatedAt: string
}

export interface AuthUser {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
    avatar?: string
}

export interface RegisterPayload {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
}

export interface LoginPayload {
    email: string
    password: string
}