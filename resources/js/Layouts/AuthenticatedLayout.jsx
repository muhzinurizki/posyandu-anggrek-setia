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
    Bell,
    ShieldCheck,
    ChevronRight,
    Building2,
    Search
} from "lucide-react";

export default function Authenticated({ user, header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        {
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />,
            href: route("dashboard"),
            active: route().current("dashboard"),
        },
        {
            label: "Data Balita",
            icon: <Baby size={18} />,
            href: route("balita.index"),
            active: route().current("balita.index") || route().current("balita.create") || route().current("balita.edit") || route().current("balita.show"),
        },
        {
            label: "Laporan Pemeriksaan",
            icon: <ClipboardList size={18} />,
            href: route("pemeriksaan.index"),
            active: route().current("pemeriksaan.*"),
        },
        {
            label: "Kader & Personel",
            icon: <Users size={18} />,
            href: "#",
            active: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex font-sans selection:bg-blue-100">
            <FlashMessages />
            
            {/* --- SIDEBAR: OFFICIAL NAVY BLUE --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-400 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 border-r border-slate-800 shadow-xl`}
            >
                <div className="h-full flex flex-col">
                    {/* Header Sidebar: Branding Instansi */}
                    <div className="p-6 border-b border-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Building2 className="text-white" size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-tight leading-none uppercase">
                                    Anggrek <span className="text-blue-400">Setia</span>
                                </span>
                                <span className="text-[9px] font-medium text-slate-500 mt-1 uppercase tracking-widest">Sistem Posyandu</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi Menu */}
                    <nav className="flex-1 px-3 py-6 space-y-1">
                        <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Menu Utama</p>
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-2.5 rounded-md font-semibold text-[13px] transition-all group ${
                                    item.active
                                        ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                                        : "hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={item.active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </div>
                                {item.active && <div className="w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                            </Link>
                        ))}
                    </nav>

                    {/* Badge Versi & Status */}
                    <div className="px-6 py-4">
                         <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-1">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-300">SERVER SECURE</span>
                            </div>
                            <p className="text-[9px] text-slate-500 leading-tight">Terhubung dengan pusat data Dinas Kesehatan v2.4.0</p>
                         </div>
                    </div>

                    {/* User Card */}
                    <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                        <div className="flex items-center gap-3 p-2">
                            <div className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center text-white font-bold text-xs border border-slate-600">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-tighter">Administrator System</p>
                            </div>
                        </div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 rounded-md transition-all font-bold text-[10px] uppercase tracking-widest border border-slate-700"
                        >
                            <LogOut size={12} /> Keluar Aplikasi
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- AREA KONTEN UTAMA --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Navbar Atas - Formal White */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-slate-500 p-1.5 hover:bg-slate-100 rounded-md transition-colors border border-slate-200"
                        >
                            {isSidebarOpen ? <X size={18}/> : <Menu size={18}/>}
                        </button>
                        <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden lg:block"></div>
                        <div className="hidden lg:block">
                            {header}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifikasi */}
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-[1px] bg-slate-200"></div>

                        {/* Profil Link */}
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center gap-3 pl-2 group"
                        >
                            <div className="text-right hidden sm:block leading-none">
                                <p className="text-[11px] font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors uppercase">
                                    {user.name}
                                </p>
                                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                                    UPTD Tangerang
                                </p>
                            </div>
                            <div className="p-2 bg-slate-50 border border-slate-200 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-500">
                                <Settings size={18} />
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={route().current()}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}