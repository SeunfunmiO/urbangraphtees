'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useCartStore } from '@/store/cartStore'
import { formatPriceRaw } from '@/lib/utils/formatPrice'
import type { SupportedCurrency } from '@/types/shipping.types'

export default function CartDrawer() {
    const {
        items, isOpen, closeCart,
        removeItem, updateQuantity,
        getSummary, currency,
    } = useCartStore()

    const summary = getSummary()

    // Lock scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart()
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [closeCart])

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9997] animate-fade-in"
                    onClick={closeCart}
                    aria-hidden="true"
                />
            )}

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                className={cn('cart-drawer', isOpen && 'open')}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={20} className="text-acid" />
                        <h2 className="font-display text-2xl tracking-wider">CART</h2>
                        {summary.itemCount > 0 && (
                            <span className="badge-acid">{summary.itemCount}</span>
                        )}
                    </div>
                    <button onClick={closeCart} className="btn-icon" aria-label="Close cart">
                        <X size={18} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <ShoppingBag size={48} className="text-brand-border mb-4" />
                            <p className="font-display text-2xl text-brand-muted mb-2">YOUR CART IS EMPTY</p>
                            <p className="text-sm text-brand-muted mb-6">Looks like you haven't added anything yet.</p>
                            <button onClick={closeCart} className="btn-acid">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div
                                key={item._id}
                                className="flex gap-4 pb-4 border-b border-brand-border/50 last:border-0 animate-fade-up"
                            >
                                {/* Image */}
                                <div className="relative w-20 h-24 flex-shrink-0 bg-brand-surface2 clip-corner-sm overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ShoppingBag size={24} className="text-brand-border" />
                                        </div>
                                    )}
                                    {item.customization.hasCustomization && (
                                        <div className="absolute top-1 right-1 bg-acid text-brand-black text-[9px] font-700 px-1 py-0.5 font-condensed uppercase">
                                            Custom
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        onClick={closeCart}
                                        className="font-condensed font-700 text-sm text-brand-white hover:text-acid transition-colors line-clamp-2 uppercase tracking-wider block"
                                    >
                                        {item.name}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-brand-muted uppercase font-condensed">{item.size}</span>
                                        <span className="text-brand-border">·</span>
                                        <span className="flex items-center gap-1 text-xs text-brand-muted font-condensed uppercase">
                                            <span
                                                className="w-3 h-3 rounded-full border border-brand-border inline-block"
                                                style={{ background: item.colorHex }}
                                            />
                                            {item.color}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-0 border border-brand-border">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-white hover:bg-brand-surface2 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-condensed font-700">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-white hover:bg-brand-surface2 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-3">
                                            <span className="font-condensed font-700 text-sm text-brand-white">
                                                {formatPriceRaw(item.price * item.quantity, currency as SupportedCurrency)}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="text-brand-muted hover:text-red-400 transition-colors"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-4 border-t border-brand-border bg-brand-surface2 space-y-4">
                        {/* Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-brand-muted">
                                <span className="font-condensed uppercase tracking-wider">Subtotal</span>
                                <span className="font-condensed font-700 text-brand-white">
                                    {formatPriceRaw(summary.subtotal, currency as SupportedCurrency)}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-brand-muted">
                                <span>Shipping calculated at checkout</span>
                            </div>
                        </div>

                        <hr className="border-brand-border" />

                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <span className="font-condensed font-700 uppercase tracking-wider">Total</span>
                            <span className="font-display text-2xl text-acid tracking-wider">
                                {formatPriceRaw(summary.subtotal, currency as SupportedCurrency)}
                            </span>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="btn-acid w-full justify-center text-sm"
                        >
                            Checkout <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={closeCart}
                            className="btn-ghost w-full justify-center text-xs"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </aside>
        </>
    )
}