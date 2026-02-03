import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, Mars, Venus, Baby, ArrowUpRight, Activity } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Ringkasan Sistem</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
                
                {/* --- WELCOME BANNER --- */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                            Selamat Datang, {auth.user.name}! 👋
                        </h1>
                        <p className="text-slate-400 font-medium max-w-md leading-relaxed">
                            Sistem Informasi Posyandu siap membantu Anda memantau tumbuh kembang anak-anak hari ini.
                        </p>
                    </div>
                    {/* Dekorasi Abstract */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Balita */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                                <Users size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                                <ArrowUpRight size={14} /> Aktif
                            </span>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Balita</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.total_balita}</h3>
                    </div>

                    {/* Laki-Laki */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                                <Mars size={24} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Laki-Laki</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.laki_laki}</h3>
                    </div>

                    {/* Perempuan */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-pink-50 p-4 rounded-2xl text-pink-600">
                                <Venus size={24} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Perempuan</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">{stats.perempuan}</h3>
                    </div>

                    {/* Balita Baru */}
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-105 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
                                <Baby size={24} />
                            </div>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Bulan Ini</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">+{stats.baru_bulan_ini}</h3>
                    </div>
                </div>

                {/* --- PLACEHOLDER CHART SECTION --- */}
                <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="bg-slate-50 p-6 rounded-full mb-4 text-slate-300">
                        <Activity size={48} />
                    </div>
                    <h4 className="text-slate-800 font-black uppercase tracking-widest text-sm">Grafik Pertumbuhan</h4>
                    <p className="text-slate-400 text-xs mt-2 text-center max-w-xs">
                        Visualisasi rata-rata berat badan balita akan muncul di sini setelah modul pemeriksaan diaktifkan.
                    </p>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}