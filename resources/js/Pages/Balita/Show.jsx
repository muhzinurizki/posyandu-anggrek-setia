import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Baby, Scale, Ruler, History, Calendar } from "lucide-react";

export default function Show({ auth, balita }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Profil ${balita.nama_balita}`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <Link href={route('balita.index')} className="text-slate-400 font-bold text-xs uppercase flex items-center gap-2">
                    <ChevronLeft size={16} /> Kembali
                </Link>

                {/* --- CARD PROFIL --- */}
                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 flex items-center gap-6">
                    <div className="bg-indigo-500 p-6 rounded-[2rem] text-white">
                        <Baby size={48} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-800">{balita.nama_balita}</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                            NIK: {balita.nik} | Ibu: {balita.nama_ibu}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- STATISTIK SINGKAT --- */}
                    <div className="space-y-4">
                        <div className="bg-emerald-500 p-6 rounded-[2.5rem] text-white shadow-lg">
                            <p className="text-[10px] font-black uppercase opacity-70">Terakhir Ditimbang</p>
                            <div className="flex items-end gap-2 mt-2">
                                <h4 className="text-4xl font-black">
                                    {balita.pemeriksaans.length > 0 ? balita.pemeriksaans[0].berat_badan : '0'}
                                </h4>
                                <span className="mb-1 font-bold">Kg</span>
                            </div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-lg">
                            <p className="text-[10px] font-black uppercase opacity-70">Tinggi Terakhir</p>
                            <div className="flex items-end gap-2 mt-2">
                                <h4 className="text-4xl font-black">
                                    {balita.pemeriksaans.length > 0 ? balita.pemeriksaans[0].tinggi_badan : '0'}
                                </h4>
                                <span className="mb-1 font-bold">Cm</span>
                            </div>
                        </div>
                    </div>

                    {/* --- TABEL RIWAYAT --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 min-h-full">
                            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6 flex items-center gap-3">
                                <History className="text-indigo-500" /> Riwayat Pemeriksaan
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                                            <th className="pb-4 text-left">Tanggal</th>
                                            <th className="pb-4 text-center">BB</th>
                                            <th className="pb-4 text-center">TB</th>
                                            <th className="pb-4 text-center">LK</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {balita.pemeriksaans && balita.pemeriksaans.length > 0 ? (
                                            balita.pemeriksaans.map((p) => (
                                                <tr key={p.id} className="group">
                                                    <td className="py-4 font-bold text-slate-700">
                                                        {new Date(p.tgl_periksa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg font-black text-xs">{p.berat_badan} kg</span>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-lg font-black text-xs">{p.tinggi_badan} cm</span>
                                                    </td>
                                                    <td className="py-4 text-center text-slate-400 font-bold text-xs">
                                                        {p.lingkar_kepala || '-'} cm
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-20 text-center text-slate-300 font-black uppercase text-[10px] tracking-[0.2em]">
                                                    Belum Ada Data Pemeriksaan
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}