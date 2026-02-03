import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { UserCircle, Mail, Save, CheckCircle2 } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    // Mengambil inisial nama untuk avatar
    const getInitial = (name) => name.charAt(0).toUpperCase();

    return (
        <section className={className}>
            <header className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                {/* Avatar Visual */}
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-rose-200 shrink-0">
                    {getInitial(data.name)}
                </div>
                
                <div>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                        Informasi Profil
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500 leading-relaxed">
                        Perbarui nama akun dan alamat email Anda untuk memastikan identitas tetap akurat.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Input Nama */}
                <div className="group">
                    <InputLabel 
                        htmlFor="name" 
                        value="Nama Lengkap" 
                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 group-focus-within:text-pink-500 transition-colors"
                    />

                    <div className="relative">
                        <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-500 transition-colors" size={20} />
                        <TextInput
                            id="name"
                            className="block w-full pl-12 bg-slate-50 border-slate-200 rounded-2xl py-3.5 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-medium"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>

                    <InputError className="mt-2 text-[10px] font-bold uppercase tracking-wider" message={errors.name} />
                </div>

                {/* Input Email */}
                <div className="group">
                    <InputLabel 
                        htmlFor="email" 
                        value="Alamat Email" 
                        className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 group-focus-within:text-pink-500 transition-colors"
                    />

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-pink-500 transition-colors" size={20} />
                        <TextInput
                            id="email"
                            type="email"
                            className="block w-full pl-12 bg-slate-50 border-slate-200 rounded-2xl py-3.5 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all font-medium"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="nama@email.com"
                        />
                    </div>

                    <InputError className="mt-2 text-[10px] font-bold uppercase tracking-wider" message={errors.email} />
                </div>

                {/* Verifikasi Email Section */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                        <p className="text-sm font-bold text-amber-800 flex items-center gap-2">
                            Alamat email Anda belum terverifikasi.
                        </p>
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="mt-2 text-xs font-black uppercase tracking-widest text-amber-600 underline hover:text-amber-800 transition-all"
                        >
                            Klik di sini untuk mengirim ulang email verifikasi.
                        </Link>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-white inline-block px-3 py-1 rounded-lg border border-emerald-100">
                                Link verifikasi baru telah dikirim!
                            </div>
                        )}
                    </div>
                )}

                {/* Submit Section */}
                <div className="flex items-center gap-5 pt-2">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-slate-900 hover:bg-pink-600 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        <Save size={16} /> Simpan Profil
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
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                            <CheckCircle2 size={14} /> Tersimpan
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}