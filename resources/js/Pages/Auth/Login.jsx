import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowLeft, Heart, Sparkles } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row font-sans selection:bg-pink-100 selection:text-pink-600">
            <Head title="Masuk - Anggrek Setia" />

            {/* --- SISI KIRI: FORM --- */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[450px] lg:w-[550px] bg-white p-8 md:p-16 flex flex-col justify-center relative z-10 shadow-2xl"
            >
                {/* Back to Home */}
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-pink-600 transition font-bold text-sm group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Kembali
                </Link>

                <div className="mb-10 text-center md:text-left">
                    <div className="inline-flex p-3 rounded-2xl bg-pink-50 text-pink-600 mb-6">
                        <Heart size={28} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Selamat Datang!</h1>
                    <p className="text-slate-500 font-medium">Masuk ke sistem operasional Posyandu Anggrek Setia.</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600 italic bg-green-50 p-3 rounded-xl border border-green-100">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email Petugas / Kader" className="text-slate-700 font-bold mb-2 ml-1" />
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                <Mail size={20} />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-slate-700 font-bold mb-2 ml-1" />
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                <Lock size={20} />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer group">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded text-pink-600 focus:ring-pink-500 border-slate-300"
                            />
                            <span className="ml-2 text-sm text-slate-500 group-hover:text-slate-700 transition">Ingat saya</span>
                        </label>
                        
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-bold text-pink-600 hover:text-pink-700 underline underline-offset-4"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>

                    <div className="pt-2">
                        <PrimaryButton 
                            className="w-full py-4 bg-slate-900 hover:bg-pink-600 justify-center rounded-2xl text-lg font-black tracking-wide shadow-xl shadow-slate-200 hover:shadow-pink-200 transition-all active:scale-[0.98]" 
                            disabled={processing}
                        >
                            <LogIn className="mr-2" size={20} />
                            Masuk Sekarang
                        </PrimaryButton>
                    </div>

                    <p className="text-center text-sm font-medium text-slate-500 mt-8">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="text-pink-600 font-black hover:underline underline-offset-4">
                            Daftar di sini
                        </Link>
                    </p>
                </form>
            </motion.div>

            {/* --- SISI KANAN: VISUAL --- */}
            <div className="hidden md:flex flex-1 bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-full h-full opacity-30">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600 rounded-full blur-[150px]" />
                </div>

                <div className="relative z-10 p-12 text-center max-w-lg">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-8 border border-white/20 shadow-2xl">
                            <Sparkles className="text-pink-400" size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6 leading-tight tracking-tighter">
                            "Kesehatan anak adalah investasi terbesar masa depan."
                        </h2>
                        <div className="w-20 h-1.5 bg-pink-600 mx-auto rounded-full mb-6" />
                        <p className="text-slate-400 text-lg font-medium italic">
                            — Anggrek Setia Team
                        </p>
                    </motion.div>
                </div>

                {/* Glassmorphism Badge */}
                <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute bottom-12 right-12 bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex items-center gap-4 shadow-2xl"
                >
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-pink-900/20 italic text-xl">
                        A
                    </div>
                    <div className="text-left text-white">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Posyandu Digital</p>
                        <p className="text-sm font-black tracking-tight uppercase">Sistem Terintegrasi</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}