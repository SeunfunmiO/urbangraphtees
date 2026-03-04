// ─── CART TYPES ───────────────────────────────────────────────────────────────

export interface CustomizationData {
    hasCustomization: boolean
    imageUrl?: string
    publicId?: string
    position: 'front' | 'back' | 'left' | 'right' | 'center'
    placement: { x: number; y: number }
    scale: number
    rotation: number
    width: number
    height: number
}

export interface CartItem {
    _id: string
    productId: string
    name: string
    slug: string
    image: string
    price: number
    size: string
    color: string
    colorHex: string
    quantity: number
    customization: CustomizationData
}

export interface Cart {
    _id: string
    userId?: string
    sessionId?: string
    items: CartItem[]
    createdAt: string
    updatedAt: string
}

export interface CartSummary {
    subtotal: number
    shippingCost: number
    discount: number
    tax: number
    total: number
    itemCount: number
    currency: string
}