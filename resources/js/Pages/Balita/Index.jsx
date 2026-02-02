import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    Plus, Search, Mars, Venus, Edit3, Trash2, 
    MoreVertical, Eye, UserPlus, ArrowLeft, Filter,
    ChevronRight, Info
} from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, balitas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form Processing menggunakan Inertia useForm
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        id: null,
        nama_balita: '',
        nik: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        nama_ibu: '',
        berat_badan_lahir: '',
        tinggi_badan_lahir: '',
        alamat: '',
    });

    // Buka Modal Tambah
    const openCreateModal = () => {
        setEditMode(false);
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    // Buka Modal Edit
    const openEditModal = (balita) => {
        setEditMode(true);
        clearErrors();
        setData({
            id: balita.id,
            nama_balita: balita.nama_balita,
            nik: balita.nik,
            jenis_kelamin: balita.jenis_kelamin,
            tanggal_lahir: balita.tanggal_lahir,
            nama_ibu: balita.nama_ibu,
            berat_badan_lahir: balita.berat_badan_lahir,
            tinggi_badan_lahir: balita.tinggi_badan_lahir,
            alamat: balita.alamat,
        });
        setIsModalOpen(true);
    };

    // Submit Form (Handle Create & Update)
    const submit = (e) => {
        e.preventDefault();
        if (editMode) {
            put(route('balita.update', data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('balita.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const deleteBalita = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini? Semua riwayat pemeriksaan juga akan terhapus.')) {
            router.delete(route('balita.destroy', id));
        }
    };

    // Filter pencarian sederhana di sisi client (opsional, server-side lebih baik untuk data besar)
    const filteredBalitas = balitas.filter(b => 
        b.nama_balita.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.nik.includes(searchTerm)
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-black text-slate-800">Database Balita</h2>}
        >
            <Head title="Manajemen Balita" />

            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
                
                {/* --- ACTION BAR --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari nama balita atau NIK..." 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={openCreateModal}
                        className="w-full md:w-auto bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-pink-600 transition shadow-xl shadow-slate-200 active:scale-95"
                    >
                        <UserPlus size={20} /> Daftarkan Balita
                    </button>
                </div>

                {/* --- TABLE SECTION --- */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                    <th className="px-8 py-5">Nama Lengkap</th>
                                    <th className="px-6 py-5">Identitas</th>
                                    <th className="px-6 py-5">Orang Tua</th>
                                    <th className="px-6 py-5 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredBalitas.length > 0 ? filteredBalitas.map((item) => (
                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ${item.jenis_kelamin === 'L' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                    {item.jenis_kelamin}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-800 group-hover:text-pink-600 transition">{item.nama_balita}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-700">{item.nik}</p>
                                            <p className="text-[10px] font-medium text-slate-400 italic">Lahir: {item.tanggal_lahir}</p>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-600">
                                            Bunda {item.nama_ibu}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => openEditModal(item)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition" title="Edit Data">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => deleteBalita(item.id)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition" title="Hapus Data">
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-slate-400 font-medium">
                                            Tidak ada data balita ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- MODAL FORM (CREATE & EDIT) --- */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={submit} className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                {editMode ? 'Perbarui Data' : 'Daftarkan Balita'}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">Lengkapi informasi biodata balita di bawah ini.</p>
                        </div>
                        <div className={`p-4 rounded-3xl ${editMode ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                            {editMode ? <Edit3 size={24}/> : <UserPlus size={24}/>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputLabel value="Nama Lengkap Balita" className="font-bold text-slate-700" />
                            <TextInput 
                                className="w-full mt-1 border-slate-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 py-3" 
                                value={data.nama_balita} 
                                onChange={e => setData('nama_balita', e.target.value)} 
                                placeholder="Contoh: Arka Zayyan"
                            />
                            <InputError message={errors.nama_balita} />
                        </div>

                        <div>
                            <InputLabel value="NIK Balita" className="font-bold text-slate-700" />
                            <TextInput 
                                className="w-full mt-1 border-slate-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 py-3" 
                                value={data.nik} 
                                onChange={e => setData('nik', e.target.value)} 
                                placeholder="16 Digit NIK"
                            />
                            <InputError message={errors.nik} />
                        </div>

                        <div>
                            <InputLabel value="Jenis Kelamin" className="font-bold text-slate-700" />
                            <select 
                                className="w-full mt-1 border-slate-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 py-3" 
                                value={data.jenis_kelamin} 
                                onChange={e => setData('jenis_kelamin', e.target.value)}
                            >
                                <option value="">Pilih Gender</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            <InputError message={errors.jenis_kelamin} />
                        </div>

                        <div>
                            <InputLabel value="Tanggal Lahir" className="font-bold text-slate-700" />
                            <TextInput 
                                type="date"
                                className="w-full mt-1 border-slate-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 py-3 text-sm" 
                                value={data.tanggal_lahir} 
                                onChange={e => setData('tanggal_lahir', e.target.value)} 
                            />
                            <InputError message={errors.tanggal_lahir} />
                        </div>

                        <div>
                            <InputLabel value="Nama Ibu Kandung" className="font-bold text-slate-700" />
                            <TextInput 
                                className="w-full mt-1 border-slate-200 rounded-xl focus:ring-pink-500 focus:border-pink-500 py-3" 
                                value={data.nama_ibu} 
                                onChange={e => setData('nama_ibu', e.target.value)} 
                                placeholder="Nama Lengkap Ibu"
                            />
                            <InputError message={errors.nama_ibu} />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-3 justify-end">
                        <SecondaryButton onClick={closeModal} className="rounded-xl px-6 py-3 font-bold border-none bg-slate-100 hover:bg-slate-200 transition">
                            Batal
                        </SecondaryButton>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${editMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'}`}
                        >
                            {processing ? 'Memproses...' : editMode ? 'Simpan Perubahan' : 'Daftarkan Balita'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}