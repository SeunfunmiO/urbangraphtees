// ─── ORDER TYPES ──────────────────────────────────────────────────────────────

import type { CartItem, CartSummary } from './cart.types'
import type { UserAddress } from './user.types'

export type OrderStatus =
    | 'pending'
    | 'payment_pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled'
    | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'paystack' | 'bank_transfer'

export interface PaystackMeta {
    reference: string
    accessCode: string
    authorizationUrl: string
    paidAt?: string
    channel?: string
    currency: string
}

export interface TrackingEvent {
    status: string
    description: string
    location?: string
    timestamp: string
}

export interface Order {
    _id: string
    orderNumber: string
    userId?: string
    guestEmail?: string
    items: CartItem[]
    shippingAddress: UserAddress
    billingAddress: UserAddress
    summary: CartSummary
    shippingZoneId: string
    shippingMethod: string
    status: OrderStatus
    paymentStatus: PaymentStatus
    paymentMethod: PaymentMethod
    paystack?: PaystackMeta
    trackingNumber?: string
    trackingEvents: TrackingEvent[]
    notes?: string
    createdAt: string
    updatedAt: string
}

export interface CreateOrderPayload {
    items: CartItem[]
    shippingAddress: UserAddress
    billingAddress: UserAddress
    shippingZoneId: string
    shippingMethod: string
    currency: string
    notes?: string
}