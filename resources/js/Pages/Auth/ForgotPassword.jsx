import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, HelpCircle } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans selection:bg-pink-100 selection:text-pink-600">
            <Head title="Lupa Kata Sandi - Anggrek Setia" />

            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-100/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-white relative overflow-hidden"
            >
                {/* Decorative Icon */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center text-pink-200">
                    <KeyRound size={64} className="rotate-12 opacity-20" />
                </div>

                <Link href={route('login')} className="inline-flex items-center gap-2 text-slate-400 hover:text-pink-600 transition font-bold text-sm mb-8 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Login
                </Link>

                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex p-4 rounded-3xl bg-pink-50 text-pink-600 mb-6 shadow-sm shadow-pink-100">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-3">Lupa Kata Sandi?</h1>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        Jangan khawatir! Masukkan alamat email Anda dan kami akan mengirimkan tautan pemulihan untuk mengatur ulang kata sandi Anda.
                    </p>
                </div>

                {status && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold text-center italic"
                    >
                        {status}
                    </motion.div>
                )}

                <form onSubmit={submit} className="relative z-10">
                    <div className="mb-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                <Mail size={20} />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all shadow-sm"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2 ml-2" />
                    </div>

                    <PrimaryButton 
                        className="w-full py-4 bg-slate-900 hover:bg-pink-600 justify-center rounded-2xl text-lg font-black tracking-wide shadow-xl shadow-slate-200 hover:shadow-pink-200 transition-all active:scale-[0.98]" 
                        disabled={processing}
                    >
                        Kirim Tautan Email
                    </PrimaryButton>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Posyandu Anggrek Setia Digital
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}