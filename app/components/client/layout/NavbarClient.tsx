'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    ShoppingBag, Search, Menu, X, User, Heart,
    ChevronDown, LogOut, Package, Shield,
} from 'lucide-react'


interface NavUser {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar?: string
}

interface NavbarClientProps {
    user: NavUser | null
}

const NAV_LINKS = [
    { label: 'Shop All', href: '/shop' },
    {
        label: 'Categories',
        href: '#',
        children: [
            { label: 'Graphic Tees', href: '/shop/tees' },
            { label: 'Plain Tees', href: '/shop/plain-tees' },
            { label: 'Hoodies', href: '/shop/hoodies' },
            { label: 'Joggers', href: '/shop/joggers' },
            { label: 'Hats', href: '/shop/hats' },
            { label: 'Shirts', href: '/shop/shirts' },
        ],
    },
    { label: 'Customize', href: '/shop?customize=true' },
]

export default function NavbarClient({ user }: NavbarClientProps) {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const searchRef = useRef<HTMLInputElement>(null)
    const userMenuRef = useRef<HTMLDivElement>(null)

    const { getItemCount, openCart } = useCartStore()
    const itemCount = getItemCount()

    // Scroll detection
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false)
        setDropdownOpen(null)
        setUserMenuOpen(false)
    }, [pathname])

    // Focus search input when opened
    useEffect(() => {
        if (searchOpen) searchRef.current?.focus()
    }, [searchOpen])

    // Close user menu on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`
            setSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-border shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
                        : 'bg-transparent'
                )}
                style={{ height: '72px' }}
            >
                <div className="container-brand h-full flex items-center justify-between gap-4">

                    {/* ── Logo ────────────────────────────────────────────── */}
                    <Link href="/" className="flex-shrink-0 group" aria-label="UrbanGraphTees home">
                        <Image
                            src="/logo.svg"
                            alt="UrbanGraphTees"
                            width={200}
                            height={48}
                            priority
                            className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-80"
                        />
                    </Link>

                    {/* ── Desktop Nav ──────────────────────────────────────── */}
                    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                        {NAV_LINKS.map(link => (
                            <div key={link.label} className="relative">
                                {link.children ? (
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setDropdownOpen(link.label)}
                                        onMouseLeave={() => setDropdownOpen(null)}
                                    >
                                        <button
                                            className={cn(
                                                'flex items-center gap-1 px-4 py-2 font-condensed font-600 text-sm uppercase tracking-widest transition-colors duration-150',
                                                'text-brand-mutedLt hover:text-acid',
                                                dropdownOpen === link.label && 'text-acid'
                                            )}
                                            style={{ letterSpacing: '0.1em' }}
                                        >
                                            {link.label}
                                            <ChevronDown
                                                size={14}
                                                className={cn(
                                                    'transition-transform duration-200',
                                                    dropdownOpen === link.label && 'rotate-180'
                                                )}
                                            />
                                        </button>

                                        {/* Dropdown */}
                                        <div
                                            className={cn(
                                                'absolute top-full left-0 w-52 pt-2 transition-all duration-200',
                                                dropdownOpen === link.label
                                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                                    : 'opacity-0 -translate-y-2 pointer-events-none'
                                            )}
                                        >
                                            <div className="bg-brand-surface1 border border-brand-border clip-corner-sm overflow-hidden">
                                                {link.children.map(child => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-2.5 font-condensed font-600 text-sm uppercase tracking-wider text-brand-mutedLt hover:text-acid hover:bg-acid/5 transition-colors duration-150 border-b border-brand-border/50 last:border-0"
                                                        style={{ letterSpacing: '0.08em' }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'px-4 py-2 font-condensed font-600 text-sm uppercase tracking-widest transition-colors duration-150',
                                            pathname === link.href
                                                ? 'text-acid'
                                                : 'text-brand-mutedLt hover:text-brand-white'
                                        )}
                                        style={{ letterSpacing: '0.1em' }}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* ── Right Actions ─────────────────────────────────────── */}
                    <div className="flex items-center gap-1">

                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="btn-icon hidden sm:flex"
                            aria-label="Search"
                        >
                            <Search size={18} />
                        </button>

                        {/* Wishlist (logged in) */}
                        {user && (
                            <Link href="/wishlist" className="btn-icon hidden sm:flex" aria-label="Wishlist">
                                <Heart size={18} />
                            </Link>
                        )}

                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="btn-icon relative"
                            aria-label={`Cart — ${itemCount} items`}
                        >
                            <ShoppingBag size={18} />
                            {itemCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-acid text-brand-black text-[10px] font-700 rounded-full flex items-center justify-center animate-scale-in"
                                    aria-hidden="true"
                                >
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div ref={userMenuRef} className="relative hidden sm:block">
                                <button
                                    onClick={() => setUserMenuOpen(prev => !prev)}
                                    className="btn-icon flex items-center gap-2"
                                    aria-label="Account menu"
                                    aria-expanded={userMenuOpen}
                                >
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.firstName}
                                            width={28}
                                            height={28}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-acid flex items-center justify-center">
                                            <span className="text-brand-black text-xs font-700">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </span>
                                        </div>
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-brand-surface1 border border-brand-border clip-corner-sm animate-scale-in z-50">
                                        {/* User info */}
                                        <div className="px-4 py-3 border-b border-brand-border">
                                            <p className="font-condensed font-700 text-sm text-brand-white">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-brand-muted truncate">{user.email}</p>
                                        </div>

                                        <div className="py-1">
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-mutedLt hover:text-acid hover:bg-acid/5 transition-colors font-condensed font-600 uppercase tracking-wider">
                                                <User size={15} /> Profile
                                            </Link>
                                            <Link href="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-mutedLt hover:text-acid hover:bg-acid/5 transition-colors font-condensed font-600 uppercase tracking-wider">
                                                <Package size={15} /> My Orders
                                            </Link>
                                            <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-mutedLt hover:text-acid hover:bg-acid/5 transition-colors font-condensed font-600 uppercase tracking-wider">
                                                <Heart size={15} /> Wishlist
                                            </Link>
                                            {user.role === 'admin' && (
                                                <>
                                                    <hr className="border-brand-border my-1" />
                                                    <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-acid hover:bg-acid/5 transition-colors font-condensed font-600 uppercase tracking-wider">
                                                        <Shield size={15} /> Admin Panel
                                                    </Link>
                                                </>
                                            )}
                                        </div>

                                        <div className="border-t border-brand-border py-1">
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors font-condensed font-600 uppercase tracking-wider"
                                            >
                                                <LogOut size={15} /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="btn-outline hidden sm:flex text-xs px-4 py-2"
                            >
                                Sign In
                            </Link>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(prev => !prev)}
                            className="btn-icon lg:hidden"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            <div className="relative w-[18px] h-[18px]">
                                <Menu
                                    size={18}
                                    className={cn(
                                        'absolute inset-0 transition-all duration-200',
                                        mobileOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
                                    )}
                                />
                                <X
                                    size={18}
                                    className={cn(
                                        'absolute inset-0 transition-all duration-200',
                                        mobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
            <div
                className={cn(
                    'fixed inset-0 z-40 lg:hidden transition-all duration-400',
                    mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
                )}
                aria-hidden={!mobileOpen}
            >
                {/* Backdrop */}
                <div
                    className={cn(
                        'absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
                        mobileOpen ? 'opacity-100' : 'opacity-0'
                    )}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Drawer */}
                <div
                    className={cn(
                        'absolute top-0 right-0 h-full w-80 bg-brand-surface1 border-l border-brand-border transition-transform duration-400',
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border" style={{ height: '72px' }}>
                        <span className="font-display text-2xl text-acid">MENU</span>
                        <button onClick={() => setMobileOpen(false)} className="btn-icon">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="px-6 py-6 space-y-1" aria-label="Mobile navigation">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                                <input
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="input-brand pl-10 text-sm"
                                />
                            </div>
                        </form>

                        {NAV_LINKS.map(link => (
                            <div key={link.label}>
                                {link.children ? (
                                    <div>
                                        <button
                                            onClick={() => setDropdownOpen(
                                                dropdownOpen === link.label ? null : link.label
                                            )}
                                            className="flex items-center justify-between w-full py-3 font-condensed font-700 text-base uppercase tracking-wider text-brand-white border-b border-brand-border/50"
                                            style={{ letterSpacing: '0.12em' }}
                                        >
                                            {link.label}
                                            <ChevronDown
                                                size={16}
                                                className={cn(
                                                    'transition-transform duration-200',
                                                    dropdownOpen === link.label && 'rotate-180'
                                                )}
                                            />
                                        </button>
                                        {dropdownOpen === link.label && (
                                            <div className="pl-4 py-2 space-y-1 border-b border-brand-border/50">
                                                {link.children.map(child => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block py-2 font-condensed text-sm uppercase tracking-wider text-brand-muted hover:text-acid transition-colors"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'block py-3 font-condensed font-700 text-base uppercase tracking-wider border-b border-brand-border/50 transition-colors',
                                            pathname === link.href ? 'text-acid' : 'text-brand-white hover:text-acid'
                                        )}
                                        style={{ letterSpacing: '0.12em' }}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brand-border space-y-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-acid flex items-center justify-center flex-shrink-0">
                                        <span className="text-brand-black text-sm font-700">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-condensed font-700 text-sm">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-brand-muted">{user.email}</p>
                                    </div>
                                </div>
                                <Link href="/orders" className="btn-outline w-full justify-center text-xs">My Orders</Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="btn-ghost w-full justify-center text-red-400 text-xs"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn-acid    w-full justify-center">Sign In</Link>
                                <Link href="/register" className="btn-outline w-full justify-center">Create Account</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Search Overlay ───────────────────────────────────────────────── */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4">
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setSearchOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl animate-scale-in">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-muted" />
                                <input
                                    ref={searchRef}
                                    type="search"
                                    placeholder="Search for tees, hoodies, joggers..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-brand-surface1 border border-brand-border text-brand-white text-lg px-14 py-5 focus:outline-none focus:border-acid transition-colors duration-200"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-brand-muted text-sm mt-4 font-condensed uppercase tracking-widest">
                            Press Enter to search · Esc to close
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}