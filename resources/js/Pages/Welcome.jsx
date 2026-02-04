import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    ArrowRight, 
    Lock,
    MapPin,
    Flower2,
    Activity,
    Users,
    ChevronRight
} from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Posyandu Anggrek Setia - Portal Resmi Kota Tangerang" />
            <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
                
                {/* --- TOPBAR RESMI --- */}
                <div className="bg-[#002d5f] py-2 px-6">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <ShieldCheck size={12} className="text-blue-400" /> Portal Resmi Pemerintah Kota Tangerang
                        </p>
                        <div className="flex gap-4">
                            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Dinas Kesehatan</span>
                        </div>
                    </div>
                </div>

                {/* --- NAVIGATION --- */}
                <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                <Flower2 size={24} />
                            </div>
                            <div>
                                <h1 className="text-[#002d5f] font-black text-base uppercase tracking-tighter leading-none">
                                    Anggrek Setia
                                </h1>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em] mt-1">
                                    Sistem Informasi Posyandu Terpadu
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="flex items-center gap-2 bg-[#002d5f] text-white px-6 py-2.5 rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all">
                                    Dashboard <ChevronRight size={14} />
                                </Link>
                            ) : (
                                <Link href={route('login')} className="flex items-center gap-2 border-2 border-[#002d5f] text-[#002d5f] px-6 py-2 rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-[#002d5f] hover:text-white transition-all">
                                    <Lock size={14} /> Login Petugas
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <main>
                    {/* --- HERO SECTION --- */}
                    <section className="relative py-24 lg:py-32 border-b border-slate-50">
                        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-5xl lg:text-6xl font-black text-[#002d5f] leading-[1.1] tracking-tight">
                                        Layanan Kesehatan <br/>
                                        <span className="text-blue-600">Berbasis Digital.</span>
                                    </h2>
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                                        Selamat datang di portal resmi <strong>Posyandu Anggrek Setia</strong>. Kami berkomitmen memberikan transparansi data tumbuh kembang anak bagi masyarakat Kota Tangerang.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Link href={route('login')} className="bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-[#002d5f] transition-all">
                                        Mulai Pendataan
                                    </Link>
                                    <button className="flex items-center gap-2 px-8 py-4 text-[#002d5f] font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-50 rounded-md transition-all">
                                        Pelajari Alur <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative lg:block hidden"
                            >
                                <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                                    <img 
                                        src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1000" 
                                        className="mix-blend-multiply opacity-80"
                                        alt="Modern Office" 
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* --- LAYANAN UTAMA (CARDS) --- */}
                    <section className="py-24 max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-12 bg-white border-r border-slate-100 hover:bg-slate-50 transition-colors">
                                <Users className="text-blue-600 mb-6" size={32} />
                                <h4 className="font-bold text-[#002d5f] uppercase text-sm tracking-widest mb-4">Manajemen Data</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Pengelolaan database balita yang aman dan terintegrasi dengan NIK Kota Tangerang.</p>
                            </div>
                            <div className="p-12 bg-white border-r border-slate-100 hover:bg-slate-50 transition-colors">
                                <Activity className="text-blue-600 mb-6" size={32} />
                                <h4 className="font-bold text-[#002d5f] uppercase text-sm tracking-widest mb-4">Monitoring Gizi</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Pemantauan grafik KMS digital secara periodik untuk memastikan kesehatan anak.</p>
                            </div>
                            <div className="p-12 bg-white hover:bg-slate-50 transition-colors">
                                <ShieldCheck className="text-blue-600 mb-6" size={32} />
                                <h4 className="font-bold text-[#002d5f] uppercase text-sm tracking-widest mb-4">Akses Terpusat</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">Layanan satu pintu bagi kader dan instansi kesehatan untuk pelaporan efisien.</p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* --- FOOTER FORMAL --- */}
                <footer className="bg-slate-50 py-20 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#002d5f] rounded flex items-center justify-center text-white">
                                        <Flower2 size={18} />
                                    </div>
                                    <h5 className="font-black text-[#002d5f] uppercase text-xs tracking-widest">Posyandu Anggrek Setia</h5>
                                </div>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-medium">
                                    Unit Pelayanan Teknis Kesehatan RW 05, <br/>
                                    Kecamatan Tangerang, Kota Tangerang.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-16">
                                <div>
                                    <h6 className="font-bold text-[#002d5f] text-[10px] uppercase tracking-[0.2em] mb-4">Navigasi</h6>
                                    <ul className="text-slate-400 text-xs space-y-2 font-bold uppercase">
                                        <li><a href="#" className="hover:text-blue-600">Beranda</a></li>
                                        <li><a href="#" className="hover:text-blue-600">Statistik</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h6 className="font-bold text-[#002d5f] text-[10px] uppercase tracking-[0.2em] mb-4">Kontak</h6>
                                    <ul className="text-slate-400 text-xs space-y-2 font-bold uppercase">
                                        <li className="flex items-center gap-2"><MapPin size={12}/> Kota Tangerang</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                © 2026 Pemerintah Kota Tangerang. All Rights Reserved.
                            </p>
                            <div className="flex gap-6">
                                <div className="w-6 h-6 bg-slate-200 rounded-full opacity-50"></div>
                                <div className="w-6 h-6 bg-slate-200 rounded-full opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}