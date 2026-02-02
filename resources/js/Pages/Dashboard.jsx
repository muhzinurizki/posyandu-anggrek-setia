import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Baby, Activity, Users, Calendar, TrendingUp, ArrowRight, BellRing } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-black text-slate-800">Pusat Kendali</h2>}>
            <Head title="Dashboard" />

            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                {/* --- STATS OVERVIEW --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Balita', value: stats.total_balita, icon: <Baby />, color: 'text-pink-600', bg: 'bg-pink-50' },
                        { label: 'Kunjungan Bulan Ini', value: '45', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Status Gizi Baik', value: '94%', icon: <Activity />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Agenda Terdekat', value: '12 Feb', icon: <Calendar />, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
                            <div className={`${s.bg} ${s.color} p-4 rounded-2xl`}>{s.icon}</div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 leading-none">{s.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase mt-1">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* INFO AGENDA (Bento) */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-4">Posyandu Rutin & <br/>Pemberian Vitamin A</h3>
                            <p className="text-slate-400 mb-8 max-w-md">Jadwal bulan ini akan dilaksanakan pada 12 Februari 2026. Pastikan stok vitamin A tersedia.</p>
                            <Link href="#" className="inline-flex items-center gap-2 bg-pink-600 px-6 py-3 rounded-2xl font-bold hover:bg-pink-700 transition">
                                Lihat Detail Agenda <ArrowRight size={18} />
                            </Link>
                        </div>
                        <Calendar size={200} className="absolute -bottom-10 -right-10 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
                    </div>

                    {/* QUICK ACCESS (Bento) */}
                    <div className="bg-white rounded-[3rem] p-8 border border-slate-200/60 shadow-sm">
                        <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                            <BellRing size={20} className="text-pink-600" /> Notifikasi
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs font-black text-pink-600 mb-1 uppercase">Sistem</p>
                                <p className="text-sm font-bold text-slate-700 leading-snug">3 Balita baru telah terdaftar hari ini.</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs font-black text-blue-600 mb-1 uppercase">Kesehatan</p>
                                <p className="text-sm font-bold text-slate-700 leading-snug">Laporan bulanan Januari sudah siap diunduh.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}