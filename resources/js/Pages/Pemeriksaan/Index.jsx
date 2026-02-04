import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    ClipboardList, 
    Plus, 
    Search, 
    Eye, 
    FileText, 
    Calendar, 
    Filter,
    ChevronRight,
    ArrowUpDown
} from "lucide-react";

export default function Index({ auth, pemeriksaans }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Log Pemeriksaan</h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        Daftar Riwayat Pemeriksaan Kesehatan Balita
                    </p>
                </div>
            }
        >
            <Head title="Data Pemeriksaan" />

            <div className="py-6 space-y-6">
                {/* --- ACTION BAR --- */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Cari nama balita atau NIK..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} /> Filter
                        </button>
                        <Link
                            href={route('pemeriksaan.create')}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                        >
                            <Plus size={16} /> Input Data Baru
                        </Link>
                    </div>
                </div>

                {/* --- TABLE CARD --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">Tanggal Periksa <ArrowUpDown size={12} /></div>
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Balita / NIK</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">BB (Kg)</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">TB (Cm)</th>
                                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {pemeriksaans.data.length > 0 ? (
                                    pemeriksaans.data.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-100 text-slate-500 rounded-md group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                        <Calendar size={14} />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700">
                                                        {new Date(p.tgl_periksa).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-800 tracking-tight">{p.balita?.nama_balita}</span>
                                                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">NIK: {p.balita?.nik}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-blue-600">{p.berat_badan}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-slate-700">{p.tinggi_badan}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase border border-emerald-100">
                                                    Normal
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link 
                                                    href={route('pemeriksaan.show', p.id)}
                                                    className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <Link 
                                                    href={route('pemeriksaan.edit', p.id)}
                                                    className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-all ml-1"
                                                    title="Edit Data"
                                                >
                                                    <FileText size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <ClipboardList size={40} className="text-slate-200 mb-3" />
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Belum ada catatan pemeriksaan</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION PLACEHOLDER --- */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            Menampilkan {pemeriksaans.data.length} Data
                        </p>
                        <div className="flex gap-2">
                             {/* Tambahkan komponen Pagination Anda di sini */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}