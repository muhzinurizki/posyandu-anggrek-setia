import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, Edit3, Scale, Ruler, Calendar, User } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Edit({ auth, balita }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_balita: balita.nama_balita || "",
        nik: balita.nik || "",
        jenis_kelamin: balita.jenis_kelamin || "",
        tanggal_lahir: balita.tanggal_lahir || "",
        nama_ibu: balita.nama_ibu || "",
        berat_badan_lahir: balita.berat_badan_lahir || "",
        tinggi_badan_lahir: balita.tinggi_badan_lahir || "",
        alamat: balita.alamat || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("balita.update", balita.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-black text-slate-800">Edit Data Balita</h2>}>
            <Head title={`Edit - ${balita.nama_balita}`} />

            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <Link href={route("balita.index")} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs mb-6 transition-all group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> KEMBALI KE DATABASE
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden">
                    {/* Header Bagian Edit */}
                    <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                <Edit3 size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tight">Perbarui Informasi</h1>
                                <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mt-1">ID Balita: #{balita.id}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Section: Identitas */}
                            <div className="md:col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <User size={14} className="text-indigo-600" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identitas Dasar</h3>
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel value="Nama Lengkap Balita" className="ml-1 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 focus:ring-2 focus:ring-indigo-500/10 shadow-sm"
                                    value={data.nama_balita}
                                    onChange={(e) => setData("nama_balita", e.target.value)}
                                    required
                                />
                                <InputError message={errors.nama_balita} />
                            </div>

                            <div>
                                <InputLabel value="NIK (16 Digit)" className="ml-1 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 shadow-sm"
                                    value={data.nik}
                                    onChange={(e) => setData("nik", e.target.value)}
                                    required
                                />
                                <InputError message={errors.nik} />
                            </div>

                            <div>
                                <InputLabel value="Jenis Kelamin" className="ml-1 mb-2" />
                                <select
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 text-sm focus:ring-2 focus:ring-indigo-500/10 shadow-sm"
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                    required
                                >
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            {/* Section: Kelahiran */}
                            <div className="md:col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2 mt-4">
                                <Calendar size={14} className="text-indigo-600" />
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Data Kelahiran & Orang Tua</h3>
                            </div>

                            <div>
                                <InputLabel value="Tanggal Lahir" className="ml-1 mb-2" />
                                <TextInput
                                    type="date"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 shadow-sm"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData("tanggal_lahir", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel value="Nama Ibu Kandung" className="ml-1 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 shadow-sm"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData("nama_ibu", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-6 p-6 bg-indigo-50/50 rounded-[2rem] border-2 border-dashed border-indigo-100">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Scale size={16} className="text-indigo-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Berat Lahir (kg)</span>
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full bg-white border-none rounded-xl py-3 shadow-sm"
                                        value={data.berat_badan_lahir}
                                        onChange={(e) => setData("berat_badan_lahir", e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Ruler size={16} className="text-indigo-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tinggi Lahir (cm)</span>
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full bg-white border-none rounded-xl py-3 shadow-sm"
                                        value={data.tinggi_badan_lahir}
                                        onChange={(e) => setData("tinggi_badan_lahir", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel value="Alamat Lengkap" className="ml-1 mb-2" />
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 min-h-[100px] shadow-sm focus:ring-2 focus:ring-indigo-500/10"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-between items-center border-t border-slate-50">
                            <button type="button" onClick={() => window.history.back()} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Batalkan Perubahan</button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95 disabled:opacity-50 flex items-center gap-3"
                            >
                                <Save size={18} /> {processing ? "Menyimpan..." : "Update Data Balita"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}