import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import {
    Search,
    UserPlus,
    Baby,
    MapPin,
    Users,
    Edit,
    Trash2,
    Eye,
    FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ auth, balitas, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== (filters.search || "")) {
                router.get(
                    route("balita.index"),
                    { search: searchTerm },
                    { preserveState: true, replace: true, only: ['balitas'] }
                );
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const deleteBalita = (balita) => {
        Swal.fire({
            title: "Konfirmasi Penghapusan",
            text: `Apakah Anda yakin ingin menghapus data atas nama ${balita.nama_balita}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e293b", // Slate 800
            cancelButtonColor: "#f1f5f9",
            confirmButtonText: "Ya, Hapus",
            cancelButtonText: "Batal",
            customClass: {
                confirmButton: "text-white px-6 py-2 rounded font-bold uppercase text-xs",
                cancelButton: "text-slate-600 px-6 py-2 rounded font-bold uppercase text-xs",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("balita.destroy", balita.id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-500" size={20} />
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Data Administrasi Balita
                    </h2>
                </div>
            }
        >
            <Head title="Data Balita - Posyandu" />

            <div className="py-6 px-4 md:px-8 max-w-full mx-auto">
                {/* --- TOOLBAR UTAMA --- */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6">
                    <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Search Section */}
                        <div className="relative w-full md:w-1/3">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Search size={16} />
                            </span>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                placeholder="Cari NIK atau Nama Balita..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Action Section */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="hidden md:block text-right mr-4 border-r pr-4 border-slate-200">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Data</p>
                                <p className="text-lg font-bold text-slate-700 leading-none">{balitas.total}</p>
                            </div>
                            <Link
                                href={route("balita.create")}
                                className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 bg-slate-800 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 transition ease-in-out duration-150 gap-2"
                            >
                                <UserPlus size={14} /> Tambah Data
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- TABEL DATA --- */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b">NIK & Nama</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b">JK</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b">Tgl Lahir / Umur</th>
                                    <th className="px-6 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b">Orang Tua</th>
                                    <th className="px-6 py-3 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {balitas.data.length > 0 ? (
                                    balitas.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-slate-900">{item.nama_balita}</div>
                                                <div className="text-xs text-slate-500 font-mono">{item.nik}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                                    {item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                <div className="font-medium text-slate-700">{item.tanggal_lahir}</div>
                                                <div className="text-[10px] text-blue-600 font-bold uppercase">
                                                    ± {Math.floor((new Date() - new Date(item.tanggal_lahir)) / (1000 * 60 * 60 * 24 * 30.4375))} bln
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} className="text-slate-400" />
                                                    <span className="font-semibold">{item.nama_ibu}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                                    <MapPin size={12} />
                                                    <span className="truncate max-w-[150px]">{item.alamat}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center items-center gap-1">
                                                    <Link href={route("balita.show", item.id)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all" title="Lihat">
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link href={route("balita.edit", item.id)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-all" title="Ubah">
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button onClick={() => deleteBalita(item)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all" title="Hapus">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                                            Tidak ada data balita yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINASI RESMI --- */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-slate-500">
                            Menampilkan <span className="font-bold text-slate-700">{balitas.from || 0}</span> sampai <span className="font-bold text-slate-700">{balitas.to || 0}</span> dari <span className="font-bold text-slate-700">{balitas.total}</span> data
                        </div>
                        
                        <div className="flex gap-1">
                            {balitas.links.map((link, key) => (
                                !link.url ? (
                                    <span
                                        key={key}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-3 py-1 text-[11px] font-bold text-slate-300 border border-slate-200 rounded bg-white cursor-not-allowed"
                                    />
                                ) : (
                                    <Link
                                        key={key}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 text-[11px] font-bold border rounded transition-all ${
                                            link.active
                                                ? "bg-slate-800 border-slate-800 text-white"
                                                : "bg-white border-slate-300 text-slate-600 hover:bg-slate-100"
                                        }`}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}