import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white relative">
            <Head title="Pemulihan Akses | Anggrek Setia" />

            {/* Tombol Kembali ke Login (Pojok Kiri Atas) */}
            <div className="absolute top-8 left-8">
                <Link 
                    href={route('login')} 
                    className="group flex items-center gap-2 text-slate-400 hover:text-[#002d5f] transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                    Kembali ke Login
                </Link>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Header Icon & Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex p-5 rounded-3xl bg-blue-50 text-blue-900 mb-6 shadow-sm shadow-blue-100">
                        <KeyRound size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[#002d5f] tracking-tighter mb-4 uppercase">
                        Pemulihan <span className="text-blue-600">Akses.</span>
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium px-4">
                        Masukkan email dinas Anda yang terdaftar. Kami akan mengirimkan tautan pemulihan kata sandi secara aman.
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold text-center italic"
                    >
                        {status}
                    </motion.div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            Email Terdaftar
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-600 transition-colors">
                                <Mail size={18} />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 transition-all font-bold text-slate-700 text-sm"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@tangerangkota.go.id"
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2 ml-1" />
                    </div>

                    <PrimaryButton 
                        className="w-full py-4 bg-[#002d5f] hover:bg-blue-700 justify-center rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all active:scale-[0.98]" 
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Kirim Tautan Pemulihan'}
                    </PrimaryButton>
                </form>

                {/* Footer Security Note */}
                <div className="mt-12 flex items-center justify-center gap-3 py-4 border-t border-slate-50">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Otoritas Keamanan Kota Tangerang
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

// Menggunakan GuestLayout yang sudah kita rontokkan sebelumnya
ForgotPassword.layout = (page) => <GuestLayout children={page} />;