import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { 
    Search, Mars, Venus, Edit3, Trash2, 
    UserPlus, Scale, Ruler, Calendar, 
    Baby, MapPin, ChevronLeft, ChevronRight 
} from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ auth, balitas, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    // --- LOGIKA SEARCH (DEBOUNCE) ---
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (filters.search || "")) {
                router.get(route("balita.index"), { search: searchTerm }, { preserveState: true, replace: true });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // --- LOGIKA HITUNG UMUR ---
    const calculateAge = (birthDate) => {
        if (!birthDate) return "0 Bulan";
        const diff = new Date() - new Date(birthDate);
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
        return `${months} Bulan`;
    };

    // --- LOGIKA DELETE ---
    const deleteBalita = (balita) => {
        Swal.fire({
            title: 'Hapus Data?',
            text: `Seluruh data "${balita.nama_balita}" akan dihapus permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'YA, HAPUS',
            cancelButtonText: 'BATAL',
            customClass: {
                popup: "rounded-[2rem] p-8 shadow-2xl",
                confirmButton: "bg-rose-600 text-white px-8 py-3 rounded-xl font-black mx-2 hover:bg-rose-700 transition-all",
                cancelButton: "bg-slate-100 text-slate-500 px-8 py-3 rounded-xl font-black mx-2 hover:bg-slate-200 transition-all",
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("balita.destroy", balita.id), {
                    onSuccess: () => Swal.fire({ 
                        title: 'Terhapus!', 
                        text: 'Data berhasil dibersihkan dari sistem.',
                        icon: 'success', 
                        timer: 1500, 
                        showConfirmButton: false,
                        customClass: { popup: "rounded-[2rem]" }
                    })
                });
            }
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="text-xl font-black text-slate-800">Database Balita</h2>}
        >
            <Head title="Manajemen Balita" />

            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                
                {/* --- TOP BAR: SEARCH & ADD --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
                    <div className="space-y-1 text-center md:text-left">
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
                            Daftar Anak
                        </h1>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total: {balitas.total} Jiwa</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari Nama atau NIK..."
                                className="w-full md:w-80 pl-12 pr-4 py-3.5 bg-slate-100/50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-pink-500/10 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Link
                            href={route("balita.create")}
                            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-pink-600 transition-all shadow-xl active:scale-95"
                        >
                            <UserPlus size={18} /> Daftarkan Balita
                        </Link>
                    </div>
                </div>

                {/* --- MAIN TABLE --- */}
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-10 py-7">Profil Lengkap</th>
                                    <th className="px-6 py-7">Kelahiran</th>
                                    <th className="px-6 py-7 text-center">Fisik Awal</th>
                                    <th className="px-6 py-7">Keluarga</th>
                                    <th className="px-10 py-7 text-right">Opsi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {balitas.data.length > 0 ? (
                                    balitas.data.map((item) => (
                                        <tr key={item.id} className="group hover:bg-slate-50/80 transition-all">
                                            {/* Profil */}
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 ${item.jenis_kelamin === 'L' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
                                                        {item.jenis_kelamin === 'L' ? <Mars size={24} strokeWidth={3} /> : <Venus size={24} strokeWidth={3} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{item.nama_balita}</p>
                                                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">NIK {item.nik}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Usia */}
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                                                        <Baby size={14} className="text-pink-500" /> {calculateAge(item.tanggal_lahir)}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                        <Calendar size={12} /> {item.tanggal_lahir}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Fisik */}
                                            <td className="px-6 py-6">
                                                <div className="flex items-center justify-center gap-5 bg-slate-50/50 py-2 rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="text-center">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase italic">Berat</p>
                                                        <p className="text-xs font-black text-slate-700">{item.berat_badan_lahir} kg</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase italic">Tinggi</p>
                                                        <p className="text-xs font-black text-slate-700">{item.tinggi_badan_lahir} cm</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Alamat & Ibu */}
                                            <td className="px-6 py-6">
                                                <p className="text-[11px] font-black text-slate-800 leading-none mb-1.5 uppercase">Bunda {item.nama_ibu}</p>
                                                <div className="flex items-start gap-1 text-[10px] font-bold text-slate-400 max-w-[140px]">
                                                    <MapPin size={10} className="mt-0.5 shrink-0" />
                                                    <span className="truncate">{item.alamat}</span>
                                                </div>
                                            </td>

                                            {/* Aksi */}
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <Link 
                                                        href={route("balita.edit", item.id)} 
                                                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    >
                                                        <Edit3 size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => deleteBalita(item)} 
                                                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-32 text-center">
                                            <div className="flex flex-col items-center opacity-30">
                                                <div className="bg-slate-100 p-6 rounded-full mb-4"><Baby size={48} className="text-slate-400" /></div>
                                                <p className="font-black tracking-[0.3em] uppercase text-xs text-slate-500">Data Balita Tidak Ditemukan</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* --- PAGINATION (NO EXTERNAL COMPONENT) --- */}
                    <div className="px-10 py-8 bg-slate-50/30 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Menampilkan <span className="text-slate-900">{balitas.from || 0}</span> sampai <span className="text-slate-900">{balitas.to || 0}</span> dari <span className="text-slate-900">{balitas.total}</span> balita
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                            {balitas.links.map((link, key) => {
                                // Bersihkan label dari tag HTML (untuk tombol Previous/Next)
                                const cleanLabel = link.label
                                    .replace("&laquo; Previous", "«")
                                    .replace("Next &raquo;", "»");

                                return link.url === null ? (
                                    <div key={key} className="px-4 py-2 text-[10px] font-black text-slate-300 bg-white border border-slate-100 rounded-xl opacity-50 cursor-not-allowed">
                                        {cleanLabel}
                                    </div>
                                ) : (
                                    <Link
                                        key={key}
                                        href={link.url}
                                        className={`px-4 py-2 text-[10px] font-black rounded-xl border transition-all active:scale-90 ${
                                            link.active
                                                ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                                                : "bg-white border-slate-100 text-slate-500 hover:border-pink-500 hover:text-pink-500"
                                        }`}
                                    >
                                        {cleanLabel}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}