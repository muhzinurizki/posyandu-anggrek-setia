import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, UserPlus, Scale, Ruler, FileText } from "lucide-react";
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
            header={
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-500" size={20} />
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Registrasi Balita Baru
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Balita" />

            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Navigasi Kembali */}
                <Link 
                    href={route("balita.index")} 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs mb-6 transition-colors uppercase tracking-widest"
                >
                    <ChevronLeft size={16} /> Kembali ke Daftar Data
                </Link>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header Form - Formal Style */}
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-800 p-2.5 rounded-md text-white">
                                <UserPlus size={20} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-800 tracking-tight">Formulir Perekaman Data</h1>
                                <p className="text-slate-500 text-[11px] font-medium mt-0.5 uppercase tracking-wider">Input data sesuai dengan Kartu Keluarga atau Buku KIA</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {/* Nama Lengkap */}
                            <div className="md:col-span-2">
                                <InputLabel value="Nama Lengkap Balita" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nama_balita}
                                    onChange={(e) => setData("nama_balita", e.target.value)}
                                    placeholder="Masukkan nama lengkap anak..."
                                    required
                                />
                                <InputError message={errors.nama_balita} className="mt-2" />
                            </div>

                            {/* NIK */}
                            <div>
                                <InputLabel value="Nomor Induk Kependudukan (NIK)" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    type="number"
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nik}
                                    onChange={(e) => setData("nik", e.target.value)}
                                    placeholder="16 digit NIK..."
                                    required
                                />
                                <InputError message={errors.nik} className="mt-2" />
                            </div>

                            {/* Jenis Kelamin */}
                            <div>
                                <InputLabel value="Jenis Kelamin" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <select
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 bg-white"
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Jenis Kelamin --</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                <InputError message={errors.jenis_kelamin} className="mt-2" />
                            </div>

                            {/* Tanggal Lahir */}
                            <div>
                                <InputLabel value="Tanggal Lahir" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    type="date"
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData("tanggal_lahir", e.target.value)}
                                    required
                                />
                                <InputError message={errors.tanggal_lahir} className="mt-2" />
                            </div>

                            {/* Nama Ibu */}
                            <div>
                                <InputLabel value="Nama Lengkap Ibu" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData("nama_ibu", e.target.value)}
                                    placeholder="Nama ibu kandung..."
                                    required
                                />
                                <InputError message={errors.nama_ibu} className="mt-2" />
                            </div>

                            {/* Seksi Metrik Lahir */}
                            <div className="md:col-span-2 grid grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md">
                                <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Data Fisik Kelahiran</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Scale size={14} className="text-slate-400" />
                                        <InputLabel value="Berat (kg)" className="text-[11px] font-bold text-slate-600" />
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full border-slate-300 rounded shadow-sm text-sm"
                                        value={data.berat_badan_lahir}
                                        onChange={(e) => setData("berat_badan_lahir", e.target.value)}
                                        placeholder="Contoh: 3.2"
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Ruler size={14} className="text-slate-400" />
                                        <InputLabel value="Tinggi (cm)" className="text-[11px] font-bold text-slate-600" />
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full border-slate-300 rounded shadow-sm text-sm"
                                        value={data.tinggi_badan_lahir}
                                        onChange={(e) => setData("tinggi_badan_lahir", e.target.value)}
                                        placeholder="Contoh: 49"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="md:col-span-2">
                                <InputLabel value="Alamat Lengkap" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <textarea
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 min-h-[100px]"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    placeholder="Dusun, RT/RW, Desa..."
                                    required
                                ></textarea>
                                <InputError message={errors.alamat} className="mt-2" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            >
                                <Save size={16} />
                                {processing ? "Sedang Memproses..." : "Simpan Ke Database"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}