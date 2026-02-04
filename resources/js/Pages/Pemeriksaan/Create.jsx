import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, ClipboardCheck } from "lucide-react";
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
                    title: "Berhasil!",
                    text: "Data pemeriksaan telah disimpan ke jurnal.",
                    icon: "success",
                    confirmButtonText: "OKE",
                    customClass: { confirmButton: "bg-emerald-500 text-white px-8 py-2 rounded-xl" }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-black text-slate-800">Catat Pertumbuhan</h2>}>
            <Head title="Tambah Pemeriksaan" />
            <div className="p-4 md:p-8 max-w-2xl mx-auto">
                <Link href={route('pemeriksaan.index')} className="inline-flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6 hover:text-indigo-600 transition-colors">
                    <ChevronLeft size={16} /> Kembali
                </Link>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-8 text-white flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md"><ClipboardCheck size={24} /></div>
                        <div>
                            <h3 className="font-black text-xl">Input Data KMS</h3>
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Silakan pilih balita dan masukkan hasil ukur</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-5">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Nama Balita</label>
                            <select 
                                className="w-full border-slate-100 bg-slate-50 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none"
                                value={data.balita_id} onChange={e => setData('balita_id', e.target.value)}
                            >
                                <option value="">-- Cari & Pilih Anak --</option>
                                {balitas.map(b => (
                                    <option key={b.id} value={b.id}>{b.nama_balita} - {b.nik}</option>
                                ))}
                            </select>
                            {errors.balita_id && <p className="text-rose-500 text-[10px] font-bold mt-2 ml-2">{errors.balita_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Tgl Periksa</label>
                                <input type="date" className="w-full border-slate-100 bg-slate-50 rounded-2xl py-4" value={data.tgl_periksa} onChange={e => setData('tgl_periksa', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Berat (kg)</label>
                                <input type="number" step="0.01" className="w-full border-slate-100 bg-slate-50 rounded-2xl py-4" value={data.berat_badan} onChange={e => setData('berat_badan', e.target.value)} placeholder="0.00" />
                                {errors.berat_badan && <p className="text-rose-500 text-[10px] font-bold mt-2 ml-2">{errors.berat_badan}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Tinggi (cm)</label>
                                <input type="number" step="0.1" className="w-full border-slate-100 bg-slate-50 rounded-2xl py-4" value={data.tinggi_badan} onChange={e => setData('tinggi_badan', e.target.value)} placeholder="0.0" />
                                {errors.tinggi_badan && <p className="text-rose-500 text-[10px] font-bold mt-2 ml-2">{errors.tinggi_badan}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Lingkar Kepala (cm)</label>
                                <input type="number" step="0.1" className="w-full border-slate-100 bg-slate-50 rounded-2xl py-4" value={data.lingkar_kepala} onChange={e => setData('lingkar_kepala', e.target.value)} placeholder="0.0" />
                            </div>
                        </div>

                        <button disabled={processing} className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                            <Save size={18} /> {processing ? 'Sedang Menyimpan...' : 'Simpan Data Sekarang'}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}