import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, RefreshCcw, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function Edit({ auth, pemeriksaan, balitas }) {
    const { data, setData, patch, processing, errors } = useForm({
        balita_id: pemeriksaan.balita_id || "",
        tgl_periksa: pemeriksaan.tgl_periksa || "",
        berat_badan: pemeriksaan.berat_badan || "",
        tinggi_badan: pemeriksaan.tinggi_badan || "",
        lingkar_kepala: pemeriksaan.lingkar_kepala || "",
        catatan: pemeriksaan.catatan || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("pemeriksaan.update", pemeriksaan.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Perubahan Disimpan",
                    text: "Data rekam medis telah berhasil diperbarui.",
                    icon: "success",
                    confirmButtonColor: "#2563eb",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Koreksi Data</h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Memperbarui Rekam Pertumbuhan</p>
                </div>
            }
        >
            <Head title="Edit Pemeriksaan" />
            
            <div className="py-6 max-w-3xl mx-auto space-y-6">
                <Link href={route('pemeriksaan.index')} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors">
                    <ChevronLeft size={16} /> Batalkan Koreksi
                </Link>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-amber-50 border-b border-amber-100 p-6 flex items-center gap-4">
                        <div className="bg-amber-500 p-2.5 rounded-lg shadow-md shadow-amber-200 text-white">
                            <RefreshCcw size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-base">Mode Edit Data</h3>
                            <p className="text-amber-700 text-xs font-medium uppercase tracking-tight italic opacity-80 underline decoration-amber-300">ID Pemeriksaan: #KMS-{pemeriksaan.id}</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Info Penting */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center gap-3">
                            <AlertCircle size={16} className="text-slate-400" />
                            <p className="text-[11px] text-slate-500 font-medium italic">Anda sedang mengubah data historis. Pastikan alasan perubahan sudah sesuai dengan buku manual KMS.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Identitas Balita</label>
                            <select 
                                className="w-full border-slate-200 bg-slate-50/50 rounded-lg py-3 px-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20"
                                value={data.balita_id} 
                                onChange={e => setData('balita_id', e.target.value)}
                            >
                                {balitas.map(b => (
                                    <option key={b.id} value={b.id}>{b.nama_balita} — {b.nik}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Tanggal Periksa</label>
                                <input 
                                    type="date" 
                                    className="w-full border-slate-200 rounded-lg py-3 text-sm font-semibold"
                                    value={data.tgl_periksa} 
                                    onChange={e => setData('tgl_periksa', e.target.value)} 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Berat Badan (Kg)</label>
                                <input 
                                    type="number" step="0.01" 
                                    className="w-full border-slate-200 rounded-lg py-3 text-sm font-bold text-blue-600"
                                    value={data.berat_badan} 
                                    onChange={e => setData('berat_badan', e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Tinggi Badan (Cm)</label>
                                <input 
                                    type="number" step="0.1" 
                                    className="w-full border-slate-200 rounded-lg py-3 text-sm font-bold text-slate-700"
                                    value={data.tinggi_badan} 
                                    onChange={e => setData('tinggi_badan', e.target.value)} 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Lingkar Kepala (Cm)</label>
                                <input 
                                    type="number" step="0.1" 
                                    className="w-full border-slate-200 rounded-lg py-3 text-sm font-bold text-slate-700"
                                    value={data.lingkar_kepala} 
                                    onChange={e => setData('lingkar_kepala', e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Alasan Perubahan / Catatan</label>
                            <textarea 
                                rows="3"
                                className="w-full border-slate-200 rounded-lg py-3 text-sm"
                                value={data.catatan} 
                                onChange={e => setData('catatan', e.target.value)}
                                placeholder="Jelaskan alasan koreksi data jika perlu..."
                            ></textarea>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <button 
                                disabled={processing} 
                                className="w-full md:w-auto px-10 py-3 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-[0.15em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
                            >
                                <Save size={16} /> {processing ? 'Memproses...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}