import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Users, Mars, Venus, Baby, ArrowUpRight, 
    Activity, TrendingUp, CalendarDays, ClipboardCheck, 
    ChevronRight, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, stats }) {
    // Mendapatkan tanggal hari ini secara dinamis
    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Panel Kendali Sistem</h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        Ringkasan Data Operasional Posyandu
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6 space-y-6">
                
                {/* --- WELCOME BANNER: OFFICIAL NAVY --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0F172A] rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg border border-slate-800"
                >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md mb-6">
                                <Activity size={12} className="text-emerald-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Status Sistem: Normal</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                                Selamat Datang, {auth.user.name}
                            </h1>
                            <p className="text-slate-400 font-medium text-sm md:text-base leading-relaxed opacity-90 max-w-lg">
                                Anda login sebagai <span className="text-blue-400">Petugas Administrasi</span>. 
                                Silakan tinjau statistik populasi balita dan riwayat pemeriksaan terbaru di bawah ini.
                            </p>
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-4 bg-slate-800/40 backdrop-blur-sm p-5 rounded-lg border border-slate-700">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sesi Aktif</p>
                                <p className="text-md font-bold text-white">{today}</p>
                            </div>
                            <div className="bg-blue-600 p-2.5 rounded-md shadow-lg shadow-blue-600/20">
                                <CalendarDays size={20} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </motion.div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        icon={<Users size={20} />} 
                        label="Total Balita" 
                        value={stats.total_balita} 
                        color="slate" 
                        description="Terdaftar dalam database"
                    />
                    <StatCard 
                        icon={<Mars size={20} />} 
                        label="Laki-Laki" 
                        value={stats.laki_laki} 
                        color="blue" 
                    />
                    <StatCard 
                        icon={<Venus size={20} />} 
                        label="Perempuan" 
                        value={stats.perempuan} 
                        color="pink" 
                    />
                    <StatCard 
                        icon={<TrendingUp size={20} />} 
                        label="Registrasi Baru" 
                        value={stats.baru_bulan_ini} 
                        color="emerald" 
                        isTrend={true}
                    />
                </div>

                {/* --- CHART & INFO SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Analytics Placeholder */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h4 className="text-slate-800 font-bold text-sm tracking-tight">Aktivitas Pemeriksaan Rutin</h4>
                                <p className="text-slate-400 text-[11px] font-medium mt-0.5 uppercase tracking-wide">Analisis frekuensi kunjungan bulanan</p>
                            </div>
                            <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                                Lihat Laporan Lengkap <ChevronRight size={14} />
                            </button>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50/50">
                                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                                    <Activity size={32} className="text-slate-300 animate-pulse" />
                                </div>
                                <p className="text-slate-500 font-semibold text-xs uppercase tracking-widest">Memproses visualisasi data...</p>
                                <p className="text-slate-400 text-[10px] mt-1 italic">Data grafik otomatis diperbarui setiap 24 jam</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Guide / Memo */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                            <Info size={16} className="text-blue-600" />
                            <h4 className="text-slate-800 font-bold text-sm uppercase tracking-tight">Memo Petugas</h4>
                        </div>
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 bg-blue-100 p-1 rounded">
                                    <ClipboardCheck size={12} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-700 leading-tight">Verifikasi Data</p>
                                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                        Pastikan pengisian NIK balita sudah sesuai dengan Kartu Keluarga terbaru.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-emerald-100 p-1 rounded">
                                    <Activity size={12} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-700 leading-tight">Target Imunisasi</p>
                                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                                        Segera laporkan jika terdapat penurunan jumlah kunjungan di wilayah tertentu.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <button className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] font-bold text-slate-600 transition-all uppercase tracking-widest">
                                Unduh Panduan Operasional
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ icon, label, value, color, description, isTrend }) {
    const colorStyles = {
        slate: "bg-slate-100 text-slate-600 border-slate-200",
        blue: "bg-blue-100 text-blue-600 border-blue-200",
        pink: "bg-pink-100 text-pink-600 border-pink-200",
        emerald: "bg-emerald-100 text-emerald-600 border-emerald-200"
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg border ${colorStyles[color]}`}>
                    {icon}
                </div>
                {isTrend && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        BULAN INI <ArrowUpRight size={10} />
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                    {description && <span className="text-[10px] text-slate-400 font-medium italic">{description}</span>}
                </div>
            </div>
        </div>
    );
}