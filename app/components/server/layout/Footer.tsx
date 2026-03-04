import Link from 'next/link'
import Image from 'next/image'
import {
    Instagram, Twitter, Youtube, Facebook,
    Mail, MapPin, ArrowUpRight,
} from 'lucide-react'

const SHOP_LINKS = [
    { label: 'Graphic Tees', href: '/shop/tees' },
    { label: 'Plain Tees', href: '/shop/plain-tees' },
    { label: 'Hoodies', href: '/shop/hoodies' },
    { label: 'Joggers', href: '/shop/joggers' },
    { label: 'Hats', href: '/shop/hats' },
    { label: 'Shirts', href: '/shop/shirts' },
    { label: 'Customize', href: '/shop?customize=true' },
]

const HELP_LINKS = [
    { label: 'Track My Order', href: '/orders' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
]

const SOCIAL_LINKS = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/urbangraphtees' },
    { icon: Twitter, label: 'Twitter/X', href: 'https://twitter.com/urbangraphtees' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@urbangraphtees' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/urbangraphtees' },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-brand-surface1 border-t border-brand-border mt-24">

            {/* ── CTA Band ─────────────────────────────────────────────────── */}
            <div className="bg-acid">
                <div className="container-brand py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-display text-3xl text-brand-black tracking-wider">
                            WEAR YOUR STORY.
                        </p>
                        <p className="font-condensed text-sm text-brand-black/70 font-600 uppercase tracking-widest mt-0.5">
                            Free shipping on orders over ₦50,000
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="flex-shrink-0 bg-brand-black text-acid px-8 py-3 font-condensed font-700 text-sm uppercase tracking-widest hover:bg-brand-surface1 transition-colors duration-200 clip-corner-sm inline-flex items-center gap-2"
                        style={{ letterSpacing: '0.12em' }}
                    >
                        Shop Now <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>

            {/* ── Main Footer Grid ─────────────────────────────────────────── */}
            <div className="container-brand py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Image
                            src="/logo.svg"
                            alt="UrbanGraphTees"
                            width={180}
                            height={44}
                            className="h-10 w-auto mb-6"
                        />
                        <p className="text-sm text-brand-muted leading-relaxed mb-6 font-body">
                            Streetwear for the bold. Every piece tells a story.
                            Designed for the streets, built to last.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="btn-icon"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="label-section mb-5">Shop</h3>
                        <ul className="space-y-3">
                            {SHOP_LINKS.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-brand-muted hover:text-acid transition-colors duration-150 font-body inline-flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-acid">›</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="label-section mb-5">Help</h3>
                        <ul className="space-y-3">
                            {HELP_LINKS.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-brand-muted hover:text-acid transition-colors duration-150 font-body inline-flex items-center gap-1 group"
                                    >
                                        <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-acid">›</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact + Newsletter */}
                    <div>
                        <h3 className="label-section mb-5">Stay Connected</h3>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a
                                href="mailto:hello@urbangraphtees.com"
                                className="flex items-center gap-2 text-sm text-brand-muted hover:text-acid transition-colors"
                            >
                                <Mail size={14} className="flex-shrink-0" />
                                hello@urbangraphtees.com
                            </a>
                            <p className="flex items-start gap-2 text-sm text-brand-muted">
                                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                                Ships worldwide from Lagos, NG
                            </p>
                        </div>

                        {/* Newsletter */}
                        <p className="text-xs text-brand-muted font-condensed uppercase tracking-wider mb-3">
                            Join the movement
                        </p>
                        <NewsletterForm />
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ───────────────────────────────────────────────── */}
            <div className="border-t border-brand-border">
                <div className="container-brand py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-brand-muted font-body">
                        © {year} UrbanGraphTees. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-xs text-brand-muted hover:text-acid transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ── Newsletter Form (client island) ──────────────────────────────────────── */
function NewsletterForm() {
    'use client'
    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                const input = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)
                if (input?.value) {
                    // Will wire to server action in Phase 5
                    input.value = ''
                    alert('Thanks! You\'re on the list.')
                }
            }}
            className="flex gap-0"
        >
            <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 bg-brand-surface2 border border-brand-border border-r-0 text-brand-white text-xs px-3 py-2.5 focus:outline-none focus:border-acid transition-colors placeholder:text-brand-muted"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
            />
            <button
                type="submit"
                className="bg-acid text-brand-black text-xs font-700 px-4 py-2.5 font-condensed uppercase tracking-wider hover:bg-[#CCFF44] transition-colors flex-shrink-0"
                style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)' }}
            >
                Join
            </button>
        </form>
    )
}