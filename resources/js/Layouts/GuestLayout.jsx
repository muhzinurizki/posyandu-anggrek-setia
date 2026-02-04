import { Link } from '@inertiajs/react';
import { Flower2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* --- TOPBAR MINIMALIS (IDENTITAS KOTA) --- */}
            <div className="bg-[#002d5f] py-2.5 px-6 border-b border-white/10 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={12} className="text-blue-400" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                            Sistem Informasi Terpadu • Kota Tangerang
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">
                            Dinas Kesehatan
                        </span>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            {/* Kita hapus pembatas 'sm:max-w-md' agar konten Login 
                bisa meledak menjadi Full Screen Split 
            */}
            <main className="min-h-[calc(100-40px)] flex flex-col">
                {children}
            </main>

            {/* --- FOOTER KECIL --- */}
            <footer className="py-6 border-t border-slate-50 bg-white md:hidden">
                <div className="text-center space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        © 2026 Posyandu Anggrek Setia
                    </p>
                </div>
            </footer>
        </div>
    );
}