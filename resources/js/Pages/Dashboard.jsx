import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Baby, Activity, Calendar, Users, 
    Plus, ArrowUpRight, Search, Filter 
} from 'lucide-react';

export default function Dashboard({ auth }) {
    const stats = [
        { label: 'Balita Terdaftar', value: '124', icon: <Baby size={22} />, color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Kunjungan Hari Ini', value: '18', icon: <Users size={22} />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Gizi Normal', value: '92%', icon: <Activity size={22} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Agenda Terdekat', value: '12 Feb', icon: <Calendar size={22} />, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-black text-slate-800 tracking-tight">Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-8 space-y-8">
                {/* --- STATS ROW --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-5 group hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default"
                        >
                            <div className={`${item.bg} ${item.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 leading-none mb-1">{item.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- BENTO SECTION --- */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Table Section (Bento Large) */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Data Penimbangan Terbaru</h3>
                                <p className="text-sm text-slate-400 font-medium">Monitoring 5 pasien terakhir hari ini.</p>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition"><Search size={18}/></button>
                                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-pink-200 hover:bg-pink-700 transition active:scale-95">
                                    <Plus size={18} /> Tambah Data
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                        <th className="px-6 py-4">Informasi Anak</th>
                                        <th className="px-6 py-4">Berat/Tinggi</th>
                                        <th className="px-6 py-4">Status Gizi</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { name: 'Arka Zayyan', gender: 'L', age: '14 bln', weight: '10.2', height: '82', status: 'Normal' },
                                        { name: 'Siti Aminah', gender: 'P', age: '22 bln', weight: '11.5', height: '88', status: 'Normal' },
                                        { name: 'Budi Santoso', gender: 'L', age: '8 bln', weight: '7.1', height: '65', status: 'Kurang' },
                                    ].map((row, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${row.gender === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                        {row.gender}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800">{row.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{row.age}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-slate-700">{row.weight}kg <span className="text-slate-300 mx-1">/</span> {row.height}cm</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${row.status === 'Normal' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition">
                                                    <ArrowUpRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Right: Quick Shortcuts (Bento Small) */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-lg font-black mb-2 leading-tight tracking-tight">Buku Digital KIA</h4>
                                <p className="text-slate-400 text-xs font-medium mb-6">Akses panduan kesehatan ibu dan anak edisi terbaru 2026.</p>
                                <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-pink-500 hover:text-white transition-all shadow-xl">Unduh PDF</button>
                            </div>
                            <Activity size={100} className="absolute -bottom-6 -right-6 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Log Aktivitas</h4>
                            <div className="space-y-6">
                                {[
                                    { time: '10:20', text: 'Input data penimbangan Arka' },
                                    { time: '09:15', text: 'Update jadwal imunisasi' },
                                    { time: 'Kemarin', text: '5 Balita baru terdaftar' },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="text-[10px] font-black text-slate-300 w-12 pt-1 uppercase">{log.time}</div>
                                        <p className="text-sm font-bold text-slate-700 leading-snug">{log.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}