import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, UserPlus, Scale, Ruler } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_balita: "",
        nik: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        nama_ibu: "",
        berat_badan_lahir: "",
        tinggi_badan_lahir: "",
        alamat: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("balita.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-black text-slate-800">Registrasi Balita Baru</h2>}
        >
            <Head title="Tambah Balita" />

            <div className="max-w-4xl mx-auto p-4 md:p-8">
                <Link 
                    href={route("balita.index")} 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-800 font-bold text-xs mb-6 transition-colors"
                >
                    <ChevronLeft size={16} /> KEMBALI KE DATABASE
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="bg-pink-600 p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                <UserPlus size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tight">Formulir Pendaftaran</h1>
                                <p className="text-pink-100 text-xs font-medium mt-1">Pastikan data sesuai dengan Buku KIA/KK</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <InputLabel value="Nama Lengkap Balita" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 focus:ring-2 focus:ring-pink-500/10"
                                    value={data.nama_balita}
                                    onChange={(e) => setData("nama_balita", e.target.value)}
                                    placeholder="Contoh: Muhammad Arfan"
                                    required
                                />
                                <InputError message={errors.nama_balita} />
                            </div>

                            {/* NIK */}
                            <div>
                                <InputLabel value="NIK (16 Digit)" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5"
                                    value={data.nik}
                                    onChange={(e) => setData("nik", e.target.value)}
                                    placeholder="3216..."
                                    required
                                />
                                <InputError message={errors.nik} />
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <InputLabel value="Jenis Kelamin" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <select
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5 text-sm focus:ring-2 focus:ring-pink-500/10"
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Gender</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <InputLabel value="Tanggal Lahir" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <TextInput
                                    type="date"
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData("tanggal_lahir", e.target.value)}
                                    required
                                />
                            </div>

                            {/* Nama Ibu */}
                            <div>
                                <InputLabel value="Nama Ibu Kandung" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <TextInput
                                    className="w-full bg-slate-50 border-none rounded-2xl py-3.5"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData("nama_ibu", e.target.value)}
                                    placeholder="Nama Bunda..."
                                    required
                                />
                            </div>

                            {/* BB & TB Lahir */}
                            <div className="md:col-span-2 flex gap-6 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Scale size={16} className="text-pink-500" />
                                        <InputLabel value="Berat Lahir (kg)" className="text-[10px] font-black uppercase" />
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full bg-white border-none rounded-xl py-3"
                                        value={data.berat_badan_lahir}
                                        onChange={(e) => setData("berat_badan_lahir", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Ruler size={16} className="text-pink-500" />
                                        <InputLabel value="Tinggi Lahir (cm)" className="text-[10px] font-black uppercase" />
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full bg-white border-none rounded-xl py-3"
                                        value={data.tinggi_badan_lahir}
                                        onChange={(e) => setData("tinggi_badan_lahir", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="md:col-span-2">
                                <InputLabel value="Alamat Lengkap" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                <textarea
                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 min-h-[100px] focus:ring-2 focus:ring-pink-500/10"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    placeholder="Jl. Merdeka No. 123..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-3"
                            >
                                <Save size={20} />
                                {processing ? "Menyimpan..." : "Simpan Data Balita"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}