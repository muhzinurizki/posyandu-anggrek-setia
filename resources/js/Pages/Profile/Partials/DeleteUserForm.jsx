import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="flex items-start gap-4">
                <div className="bg-rose-100 p-3 rounded-2xl text-rose-600 shadow-sm">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                        Hapus Akun
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500 leading-relaxed">
                        Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. 
                        Pastikan Anda telah mengunduh data penting sebelum melanjutkan.
                    </p>
                </div>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-sm border border-rose-100"
            >
                <Trash2 size={16} /> Hapus Akun Saya
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8 relative">
                    {/* Header Modal */}
                    <div className="mb-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                            Konfirmasi Penghapusan
                        </h2>
                        <p className="mt-2 text-sm font-medium text-slate-500">
                            Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan. 
                            Silakan masukkan kata sandi Anda untuk konfirmasi.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full bg-slate-50 border-slate-200 rounded-2xl py-4 focus:ring-rose-500/10 focus:border-rose-500"
                            isFocused
                            placeholder="Ketik password konfirmasi..."
                        />

                        <InputError
                            message={errors.password}
                            className="text-center font-bold text-xs uppercase tracking-widest"
                        />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                        <SecondaryButton 
                            onClick={closeModal}
                            className="w-full sm:w-auto justify-center rounded-2xl py-3.5 border-none bg-slate-100 text-slate-600 font-black hover:bg-slate-200 transition-all"
                        >
                            Batalkan
                        </SecondaryButton>

                        <DangerButton 
                            className="w-full sm:w-auto justify-center rounded-2xl py-3.5 bg-rose-600 font-black tracking-widest hover:bg-rose-700 shadow-lg shadow-rose-200" 
                            disabled={processing}
                        >
                            Ya, Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}