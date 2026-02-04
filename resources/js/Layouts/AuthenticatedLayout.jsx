import { useState } from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import FlashMessages from "@/Components/FlashMessages";
import {
    LayoutDashboard,
    Users,
    Baby,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    X,
    Heart,
    Bell,
} from "lucide-react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        {
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: route("dashboard"),
            active: route().current("dashboard"),
        },
        {
            label: "Data Balita",
            icon: <Baby size={20} />,
            href: route("balita.index"),
            // Aktif hanya di halaman daftar & tambah balita
            active:
                route().current("balita.index") ||
                route().current("balita.create"),
        },
        {
            label: "Pemeriksaan",
            icon: <ClipboardList size={20} />,
            href: route("pemeriksaan.index"), // Ubah dari balita.index ke pemeriksaan.index
            active: route().current("pemeriksaan.*"),
        },
        {
            label: "Kader & Staff",
            icon: <Users size={20} />,
            href: "#", // Tahap selanjutnya
            active: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            <FlashMessages />
            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
            >
                <div className="h-full flex flex-col p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="bg-pink-600 p-2 rounded-xl shadow-lg shadow-pink-200">
                            <Heart className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-800">
                            ANGGREK<span className="text-pink-600">SETIA</span>
                        </span>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                                    item.active
                                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Mini Card */}
                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-black text-slate-900 truncate">
                                    {user.name}
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Kader Posyandu
                                </p>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-slate-400 hover:text-rose-600 transition"
                            >
                                <LogOut size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-xl"
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>

                    <div className="flex-1 px-4 lg:px-0">{header}</div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center gap-3 group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-slate-900 leading-none mb-1 group-hover:text-pink-600 transition">
                                    {user.name}
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Pengaturan Profil
                                </p>
                            </div>
                            <Settings
                                className="text-slate-400 group-hover:rotate-90 transition-transform duration-500"
                                size={20}
                            />
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
                    {children}
                </main>
            </div>
        </div>
    );
}
