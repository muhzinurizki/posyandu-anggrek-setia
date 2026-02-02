import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowLeft, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row font-sans selection:bg-pink-100 selection:text-pink-600">
            <Head title="Daftar Akun - Anggrek Setia" />

            {/* --- SISI KIRI: FORM --- */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-[500px] lg:w-[600px] bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 shadow-2xl overflow-y-auto"
            >
                {/* Back to Home */}
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-pink-600 transition font-bold text-sm group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Beranda
                </Link>

                <div className="mb-8 mt-10 text-center md:text-left">
                    <div className="inline-flex p-3 rounded-2xl bg-pink-50 text-pink-600 mb-4">
                        <UserPlus size={28} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Buat Akun Baru</h1>
                    <p className="text-slate-500 font-medium text-sm">Bergabung dengan ekosistem digital Posyandu Anggrek Setia.</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {/* Nama Lengkap */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama Lengkap" className="text-slate-700 font-bold mb-1.5 ml-1" />
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                <User size={18} />
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-1.5" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Alamat Email" className="text-slate-700 font-bold mb-1.5 ml-1" />
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                <Mail size={18} />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-slate-700 font-bold mb-1.5 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Sandi" className="text-slate-700 font-bold mb-1.5 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-600 transition-colors">
                                    <ShieldCheck size={18} />
                                </div>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-2xl focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                    <InputError message={errors.password_confirmation} className="mt-1" />

                    <div className="pt-4">
                        <PrimaryButton 
                            className="w-full py-4 bg-slate-900 hover:bg-pink-600 justify-center rounded-2xl text-lg font-black tracking-wide shadow-xl shadow-slate-200 hover:shadow-pink-200 transition-all active:scale-[0.98]" 
                            disabled={processing}
                        >
                            Daftar Sekarang
                        </PrimaryButton>
                    </div>

                    <p className="text-center text-sm font-medium text-slate-500 mt-6">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-pink-600 font-black hover:underline underline-offset-4">
                            Masuk di sini
                        </Link>
                    </p>
                </form>
            </motion.div>

            {/* --- SISI KANAN: VISUAL --- */}
            <div className="hidden md:flex flex-1 bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]" />
                    <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-600 rounded-full blur-[150px]" />
                </div>

                <div className="relative z-10 p-12 text-center max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="inline-flex p-5 rounded-[2.5rem] bg-gradient-to-br from-pink-500 to-rose-600 mb-10 shadow-2xl rotate-6">
                            <Heart className="text-white" size={40} fill="white" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">
                            Bergabunglah Bersama Kader Anggrek Setia
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Akses data KMS Digital real-time",
                                "Notifikasi jadwal otomatis",
                                "Kelola data imunisasi lebih efisien"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                                    <Sparkles size={16} className="text-pink-400" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}