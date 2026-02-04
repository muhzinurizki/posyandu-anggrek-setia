import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    ChevronLeft, 
    Baby, 
    Scale, 
    Ruler, 
    History, 
    Calendar, 
    User, 
    MapPin, 
    FileText 
} from "lucide-react";

export default function Show({ auth, balita }) {
    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-500" size={20} />
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Detail Informasi Balita</h2>
                </div>
            }
        >
            <Head title={`Profil ${balita.nama_balita}`} />

            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                {/* Tombol Navigasi */}
                <Link 
                    href={route('balita.index')} 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                    <ChevronLeft size={16} /> Kembali ke Database
                </Link>

                {/* --- HEADER PROFIL RESMI --- */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="bg-slate-800 p-5 rounded-lg text-white self-start shadow-md">
                            <Baby size={40} />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{balita.nama_balita}</h1>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 items-center">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                                    <User size={14} /> NIK: {balita.nik}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                                    <Calendar size={14} /> Ibu: {balita.nama_ibu}
                                </span>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase ${balita.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                    {balita.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                </span>
                            </div>
                            <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-2">
                                <MapPin size={14} className="mt-0.5" />
                                <span className="max-w-md italic">{balita.alamat}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* --- KARTU INDIKATOR (SIDEBAR) --- */}
                    <div className="space-y-4">
                        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                                <p className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Berat Terakhir</p>
                                <Scale size={18} className="text-blue-600" />
                            </div>
                            <div className="flex items-end gap-2">
                                <h4 className="text-4xl font-bold text-slate-800">
                                    {balita.pemeriksaans && balita.pemeriksaans.length > 0 ? balita.pemeriksaans[0].berat_badan : '0'}
                                </h4>
                                <span className="mb-1.5 font-bold text-slate-500 uppercase text-xs tracking-widest">Kilogram</span>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                                <p className="text-[11px] font-bold uppercase text-slate-400 tracking-widest">Tinggi Terakhir</p>
                                <Ruler size={18} className="text-slate-700" />
                            </div>
                            <div className="flex items-end gap-2">
                                <h4 className="text-4xl font-bold text-slate-800">
                                    {balita.pemeriksaans && balita.pemeriksaans.length > 0 ? balita.pemeriksaans[0].tinggi_badan : '0'}
                                </h4>
                                <span className="mb-1.5 font-bold text-slate-500 uppercase text-xs tracking-widest">Centimeter</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Metadata Registrasi</p>
                            <div className="text-[11px] text-slate-600 space-y-1">
                                <p>Terdaftar: {new Date(balita.created_at).toLocaleDateString('id-ID')}</p>
                                <p>BB Lahir: {balita.berat_badan_lahir} kg</p>
                                <p>TB Lahir: {balita.tinggi_badan_lahir} cm</p>
                            </div>
                        </div>
                    </div>

                    {/* --- TABEL RIWAYAT PEMERIKSAAN --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden h-full">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                                <History size={18} className="text-slate-500" />
                                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-tight">
                                    Log Riwayat Pemeriksaan Rutin
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white">
                                        <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                            <th className="px-6 py-4">Tanggal Periksa</th>
                                            <th className="px-6 py-4 text-center">Berat (Kg)</th>
                                            <th className="px-6 py-4 text-center">Tinggi (Cm)</th>
                                            <th className="px-6 py-4 text-center">Lingk. Kepala</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {balita.pemeriksaans && balita.pemeriksaans.length > 0 ? (
                                            balita.pemeriksaans.map((p) => (
                                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                        {new Date(p.tgl_periksa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-bold text-blue-600 text-sm">
                                                        {p.berat_badan}
                                                    </td>
                                                    <td className="px-6 py-4 text-center font-bold text-slate-700 text-sm">
                                                        {p.tinggi_badan}
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-slate-500 text-xs">
                                                        {p.lingkar_kepala || '-'} cm
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] italic">
                                                    Belum ditemukan data riwayat pemeriksaan.
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