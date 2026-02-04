import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { 
    Plus, Search, Calendar, Scale, Ruler, Trash2, 
    ChevronRight, Activity, Users, ClipboardCheck 
} from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ auth, pemeriksaans, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(route('pemeriksaan.index'), { search }, { preserveState: true, replace: true });
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Data?',
            text: "Data pemeriksaan ini akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: { popup: 'rounded-[2rem]' }
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('pemeriksaan.destroy', id));
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Log Aktivitas Posyandu</h2>}>
            <Head title="Jurnal Pemeriksaan" />
            
            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
                
                {/* --- STATS SUMMARY --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-5">
                        <div className="bg-indigo-500 p-4 rounded-2xl text-white shadow-lg shadow-indigo-100">
                            <ClipboardCheck size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Periksa</p>
                            <h4 className="text-2xl font-black text-slate-800">{pemeriksaans.total} <span className="text-xs text-slate-300 uppercase">Record</span></h4>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white flex items-center gap-5 shadow-xl">
                        <div className="bg-emerald-500 p-4 rounded-2xl shadow-lg shadow-emerald-900/20">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Update Terakhir</p>
                            <h4 className="text-lg font-bold">{pemeriksaans.data[0]?.balita.nama_balita || '-'}</h4>
                        </div>
                    </div>
                    <Link href={route('pemeriksaan.create')} className="bg-indigo-600 hover:bg-indigo-700 p-6 rounded-[2.5rem] text-white flex items-center justify-between group transition-all shadow-xl shadow-indigo-100">
                        <div className="flex items-center gap-5">
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                                <Plus size={24} />
                            </div>
                            <span className="font-black uppercase text-xs tracking-[0.2em]">Tambah Data</span>
                        </div>
                        <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                {/* --- FILTER & SEARCH --- */}
                <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-lg flex items-center px-8">
                    <Search className="text-slate-300 mr-4" size={20} />
                    <input 
                        type="text" placeholder="Cari nama balita yang diperiksa..." 
                        className="w-full border-none focus:ring-0 text-sm font-bold text-slate-600 placeholder:text-slate-300"
                        value={search} onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* --- DATA TABLE --- */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-slate-50/50 border-b border-slate-50">
                                <th className="px-10 py-6">Informasi Balita</th>
                                <th className="px-6 py-6 text-center">Detail Fisik</th>
                                <th className="px-6 py-6 text-center">Tanggal</th>
                                <th className="px-10 py-6 text-right">Opsi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pemeriksaans.data.length > 0 ? pemeriksaans.data.map((item) => (
                                <tr key={item.id} className="hover:bg-indigo-50/30 transition-all group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all font-black text-xs">
                                                {item.balita.nama_balita.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <Link href={route('balita.show', item.balita_id)} className="block font-black text-slate-800 uppercase text-sm hover:text-indigo-600 transition-colors">
                                                    {item.balita.nama_balita}
                                                </Link>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">NIK: {item.balita.nik}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="flex justify-center gap-3">
                                            <div className="flex flex-col items-center bg-slate-50 px-3 py-2 rounded-xl min-w-[60px] border border-slate-100 group-hover:border-indigo-100">
                                                <Scale size={14} className="text-indigo-400 mb-1" />
                                                <span className="text-xs font-black text-slate-700">{item.berat_badan}kg</span>
                                            </div>
                                            <div className="flex flex-col items-center bg-slate-50 px-3 py-2 rounded-xl min-w-[60px] border border-slate-100 group-hover:border-pink-100">
                                                <Ruler size={14} className="text-pink-400 mb-1" />
                                                <span className="text-xs font-black text-slate-700">{item.tinggi_badan}cm</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            <Calendar size={12} />
                                            {new Date(item.tgl_periksa).toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'})}
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('balita.show', item.balita_id)} className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
                                                <Eye size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <ClipboardCheck size={64} />
                                            <p className="mt-4 font-black uppercase text-xs tracking-[0.3em]">Data Masih Kosong</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- PAGINATION (Opsional) --- */}
                {pemeriksaans.links && (
                    <div className="flex justify-center mt-8 gap-2">
                        {pemeriksaans.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                    link.active 
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                    : 'bg-white text-slate-400 hover:bg-slate-50'
                                } ${!link.url && 'opacity-30 cursor-not-allowed'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}