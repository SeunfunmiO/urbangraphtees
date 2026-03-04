// ─── SHIPPING TYPES ───────────────────────────────────────────────────────────

export interface ShippingRate {
    id: string
    name: string    // e.g. "Standard", "Express"
    description: string
    estimatedDays: { min: number; max: number }
    price: number
    currency: string
    isFree: boolean
    freeThreshold?: number    // free if order >= this
}

export interface ShippingZone {
    _id: string
    name: string
    countries: string[]        // ISO 3166-1 alpha-2 codes
    states?: string[]        // optional state restrictions
    rates: ShippingRate[]
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface AddressValidationResult {
    isValid: boolean
    formatted?: string
    suggestions?: string[]
    components?: {
        street?: string
        city?: string
        state?: string
        country?: string
        postalCode?: string
    }
    error?: string
}

export interface ShippingCalculatorInput {
    country: string
    state?: string
    city?: string
    orderTotal: number
    currency: string
}

export interface ShippingCalculatorResult {
    zone: ShippingZone | null
    rates: ShippingRate[]
    error?: string
}

export type SupportedCurrency = 'NGN' | 'GHS' | 'KES' | 'USD' | 'GBP'

export const CURRENCY_CONFIG: Record<SupportedCurrency, {
    symbol: string
    name: string
    locale: string
    paystackCode: string
}> = {
    NGN: { symbol: '₦', name: 'Nigerian Naira', locale: 'en-NG', paystackCode: 'NGN' },
    GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi', locale: 'en-GH', paystackCode: 'GHS' },
    KES: { symbol: 'KSh', name: 'Kenyan Shilling', locale: 'en-KE', paystackCode: 'KES' },
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US', paystackCode: 'USD' },
    GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB', paystackCode: 'GBP' },
}