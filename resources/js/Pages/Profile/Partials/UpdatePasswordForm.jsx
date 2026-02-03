import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="flex items-start gap-4 mb-8">
                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 shadow-sm shrink-0">
                    <KeyRound size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                        Pembaruan Kata Sandi
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500 leading-relaxed">
                        Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk menjaga keamanan data.
                    </p>
                </div>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="group">
                    <InputLabel 
                        htmlFor="current_password" 
                        value="Kata Sandi Saat Ini" 
                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 group-focus-within:text-indigo-500 transition-colors"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                        autoComplete="current-password"
                        placeholder="••••••••"
                    />

                    <InputError message={errors.current_password} className="mt-2 text-[10px] font-bold uppercase tracking-wider" />
                </div>

                <div className="group">
                    <InputLabel 
                        htmlFor="password" 
                        value="Kata Sandi Baru" 
                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 group-focus-within:text-indigo-500 transition-colors"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                        autoComplete="new-password"
                        placeholder="Buat sandi baru yang kuat"
                    />

                    <InputError message={errors.password} className="mt-2 text-[10px] font-bold uppercase tracking-wider" />
                </div>

                <div className="group">
                    <InputLabel 
                        htmlFor="password_confirmation" 
                        value="Konfirmasi Kata Sandi" 
                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 group-focus-within:text-indigo-500 transition-colors"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                        autoComplete="new-password"
                        placeholder="Ulangi sandi baru"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2 text-[10px] font-bold uppercase tracking-wider" />
                </div>

                <div className="flex items-center gap-5 pt-2">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <ShieldCheck size={16} /> Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-4"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 translate-x-0"
                        leaveTo="opacity-0 translate-x-4"
                    >
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl">
                            <CheckCircle2 size={14} /> Berhasil Disimpan
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}