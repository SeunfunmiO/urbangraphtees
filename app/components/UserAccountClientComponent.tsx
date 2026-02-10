"use client";

import React from 'react';
import { Package, User, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';
import NavigationBar from './NavigationBar';

const UserAccountClientComponent = () => {
    const recentOrders = [
        { id: '#UG-8821', date: 'Oct 12, 2025', status: 'Delivered', total: '$145.00' },
        { id: '#UG-8744', date: 'Sep 24, 2025', status: 'Shipped', total: '$68.00' },
    ];

    return (
        <div>
            <NavigationBar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-black uppercase tracking-tighter">My Account</h1>
                        <p className="text-gray-500">Welcome back, <span className="text-neutral-600 font-bold">Urban Legend</span></p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-1 space-y-2">
                            <nav className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <AccountLink icon={<Package size={20} />} label="Orders" active />
                                <AccountLink icon={<User size={20} />} label="Profile Details" />
                                <AccountLink icon={<MapPin size={20} />} label="Addresses" />
                                <AccountLink icon={<Heart size={20} />} label="Wishlist" />
                                <hr className="my-4 border-gray-100" />
                                <button className="w-full flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition font-medium">
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="lg:col-span-3 space-y-6">

                            {/* Stats Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-black text-white p-6 rounded-xl">
                                    <p className="text-sm opacity-70">Total Spent</p>
                                    <p className="text-2xl font-bold">$1,240.00</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-sm text-gray-500">Active Orders</p>
                                    <p className="text-2xl font-bold text-neutral-600">1</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-sm text-gray-500">Points Balance</p>
                                    <p className="text-2xl font-bold">450 pts</p>
                                </div>
                            </div>

                            {/* Recent Orders Table */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="font-bold text-xl uppercase tracking-tight">Recent Orders</h2>
                                    <button className="text-sm text-neutral-600 font-bold hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold">
                                            <tr>
                                                <th className="px-6 py-4">Order ID</th>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Total</th>
                                                <th className="px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {recentOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-6 py-4 font-bold">{order.id}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{order.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-700'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{order.total}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-gray-400 hover:text-black transition">
                                                            <ChevronRight size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AccountLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition font-medium ${active ? 'bg-neutral-600 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black'
            }`}>
            {icon}
            <span>{label}</span>
        </button>
    );
}
export default UserAccountClientComponent
// Helper Component for Sidebar Links