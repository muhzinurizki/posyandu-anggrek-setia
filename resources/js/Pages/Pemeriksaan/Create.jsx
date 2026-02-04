import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, ClipboardCheck, Calendar, Info } from "lucide-react";
import Swal from "sweetalert2";

export default function Create({ auth, balitas }) {
    const { data, setData, post, processing, errors } = useForm({
        balita_id: "",
        tgl_periksa: new Date().toISOString().split('T')[0],
        berat_badan: "",
        tinggi_badan: "",
        lingkar_kepala: "",
        catatan: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pemeriksaan.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Data Tersimpan",
                    text: "Rekam medis pertumbuhan balita telah berhasil dicatat ke sistem.",
                    icon: "success",
                    confirmButtonText: "Selesai",
                    confirmButtonColor: "#2563eb", // blue-600
                    customClass: {
                        confirmButton: "px-10 py-2 rounded-lg font-bold text-sm",
                    }
                });
            },
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Input Hasil Pemeriksaan</h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Pencatatan Kartu Menuju Sehat (KMS)</p>
                </div>
            }
        >
            <Head title="Tambah Pemeriksaan" />
            
            <div className="py-6 max-w-3xl mx-auto space-y-6">
                {/* Tombol Navigasi */}
                <Link 
                    href={route('pemeriksaan.index')} 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                    <ChevronLeft size={16} /> Kembali ke Log
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header Form */}
                    <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center gap-4">
                        <div className="bg-blue-600 p-2.5 rounded-lg shadow-md shadow-blue-200 text-white">
                            <ClipboardCheck size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-base">Formulir Rekam Pertumbuhan</h3>
                            <p className="text-slate-500 text-xs font-medium italic">Pastikan alat ukur telah dikalibrasi sebelum pengisian.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Pilih Balita */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                                Identitas Balita <span className="text-rose-500">*</span>
                            </label>
                            <select 
                                className={`w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.balita_id ? 'border-rose-500' : ''}`}
                                value={data.balita_id} 
                                onChange={e => setData('balita_id', e.target.value)}
                            >
                                <option value="">-- Pilih Nama Balita dari Database --</option>
                                {balitas.map(b => (
                                    <option key={b.id} value={b.id}>{b.nama_balita} — {b.nik}</option>
                                ))}
                            </select>
                            {errors.balita_id && <p className="text-rose-600 text-[10px] font-bold mt-1 uppercase tracking-tighter">{errors.balita_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tanggal */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Tanggal Pemeriksaan</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        className="w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20"
                                        value={data.tgl_periksa} 
                                        onChange={e => setData('tgl_periksa', e.target.value)} 
                                    />
                                </div>
                            </div>

                            {/* Berat Badan */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Berat Badan (Kg)</label>
                                <div className="relative">
                                    <input 
                                        type="number" step="0.01" 
                                        placeholder="0.00"
                                        className={`w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-bold text-blue-600 focus:ring-2 focus:ring-blue-500/20 ${errors.berat_badan ? 'border-rose-500' : ''}`}
                                        value={data.berat_badan} 
                                        onChange={e => setData('berat_badan', e.target.value)} 
                                    />
                                </div>
                                {errors.berat_badan && <p className="text-rose-600 text-[10px] font-bold uppercase">{errors.berat_badan}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tinggi Badan */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Tinggi Badan (Cm)</label>
                                <input 
                                    type="number" step="0.1" 
                                    placeholder="0.0"
                                    className={`w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 ${errors.tinggi_badan ? 'border-rose-500' : ''}`}
                                    value={data.tinggi_badan} 
                                    onChange={e => setData('tinggi_badan', e.target.value)} 
                                />
                                {errors.tinggi_badan && <p className="text-rose-600 text-[10px] font-bold uppercase">{errors.tinggi_badan}</p>}
                            </div>

                            {/* Lingkar Kepala */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Lingkar Kepala (Cm)</label>
                                <input 
                                    type="number" step="0.1" 
                                    placeholder="0.0"
                                    className="w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20"
                                    value={data.lingkar_kepala} 
                                    onChange={e => setData('lingkar_kepala', e.target.value)} 
                                />
                            </div>
                        </div>

                        {/* Catatan Tambahan */}
                        <div className="space-y-2 pt-2">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Catatan / Keterangan Medis</label>
                            <textarea 
                                rows="3"
                                className="w-full border-slate-200 bg-white rounded-lg py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20"
                                value={data.catatan} 
                                onChange={e => setData('catatan', e.target.value)}
                                placeholder="Tuliskan catatan tambahan jika perlu (misal: kondisi kesehatan umum)..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
                            <button 
                                disabled={processing} 
                                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-bold text-xs uppercase tracking-[0.15em] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                <Save size={16} /> {processing ? 'Menyimpan...' : 'Simpan ke Jurnal Medis'}
                            </button>
                            <p className="text-[10px] text-slate-400 font-medium italic">
                                * Pastikan data yang dimasukkan sudah benar sebelum disimpan.
                            </p>
                        </div>
                    </form>
                </div>
                
                {/* Informasi Tambahan */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                    <Info size={16} className="text-blue-500 mt-0.5" />
                    <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                        <strong>Catatan Petugas:</strong> Pengisian lingkar kepala bersifat opsional namun sangat disarankan untuk balita di bawah usia 24 bulan guna memantau perkembangan otak.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}