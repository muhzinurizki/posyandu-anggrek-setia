import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Save, Edit3, Scale, Ruler, FileText, User, Calendar } from "lucide-react";
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
        <AuthenticatedLayout 
            user={auth.user} 
            header={
                <div className="flex items-center gap-3">
                    <FileText className="text-slate-500" size={20} />
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Data Administrasi</h2>
                </div>
            }
        >
            <Head title={`Edit - ${balita.nama_balita}`} />

            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Navigasi Kembali */}
                <Link 
                    href={route("balita.index")} 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs mb-6 transition-colors uppercase tracking-widest"
                >
                    <ChevronLeft size={16} /> Kembali ke Daftar Data
                </Link>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    {/* Header Form - Gaya Instansi */}
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-800 p-2.5 rounded-md text-white">
                                <Edit3 size={20} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-800 tracking-tight">Perbarui Informasi Balita</h1>
                                <p className="text-slate-500 text-[11px] font-medium mt-0.5 uppercase tracking-wider italic">ID Registrasi: #{balita.id}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {/* Identitas Dasar */}
                            <div className="md:col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                                <User size={14} className="text-slate-400" />
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Identitas Dasar</h3>
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel value="Nama Lengkap Balita" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nama_balita}
                                    onChange={(e) => setData("nama_balita", e.target.value)}
                                    required
                                />
                                <InputError message={errors.nama_balita} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel value="Nomor Induk Kependudukan (NIK)" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    type="number"
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nik}
                                    onChange={(e) => setData("nik", e.target.value)}
                                    required
                                />
                                <InputError message={errors.nik} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel value="Jenis Kelamin" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <select
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 bg-white"
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData("jenis_kelamin", e.target.value)}
                                    required
                                >
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            {/* Data Kelahiran */}
                            <div className="md:col-span-2 flex items-center gap-2 border-b border-slate-100 pb-2 mt-4">
                                <Calendar size={14} className="text-slate-400" />
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kelahiran & Orang Tua</h3>
                            </div>

                            <div>
                                <InputLabel value="Tanggal Lahir" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    type="date"
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData("tanggal_lahir", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <InputLabel value="Nama Lengkap Ibu" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <TextInput
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5"
                                    value={data.nama_ibu}
                                    onChange={(e) => setData("nama_ibu", e.target.value)}
                                    required
                                />
                            </div>

                            {/* Fisik Section */}
                            <div className="md:col-span-2 grid grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-md shadow-inner">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Scale size={14} className="text-slate-400" />
                                        <InputLabel value="Berat (kg)" className="text-[11px] font-bold text-slate-600" />
                                    </div>
                                    <TextInput
                                        type="number" step="0.1"
                                        className="w-full border-slate-300 rounded shadow-sm text-sm py-2"
                                        value={data.berat_badan_lahir}
                                        onChange={(e) => setData("berat_badan_lahir", e.target.value)}
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
                                        className="w-full border-slate-300 rounded shadow-sm text-sm py-2"
                                        value={data.tinggi_badan_lahir}
                                        onChange={(e) => setData("tinggi_badan_lahir", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Alamat */}
                            <div className="md:col-span-2">
                                <InputLabel value="Alamat Domisili" className="text-[11px] font-bold uppercase text-slate-500 mb-2" />
                                <textarea
                                    className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 min-h-[100px]"
                                    value={data.alamat}
                                    onChange={(e) => setData("alamat", e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <button 
                                type="button" 
                                onClick={() => window.history.back()} 
                                className="text-[11px] font-bold text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                            >
                                Batalkan Perubahan
                            </button>
                            
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-3 bg-slate-800 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 transition duration-150 disabled:opacity-50 shadow-md"
                            >
                                <Save size={16} />
                                {processing ? "Menyimpan..." : "Perbarui Data"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}