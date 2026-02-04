import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, Flower2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout'; // Pastikan import layout

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
        /* Hapus min-h-screen di sini agar menyatu dengan GuestLayout */
        <div className="flex-1 flex flex-col md:flex-row font-sans overflow-hidden">
            <Head title="Akses Petugas | Posyandu Anggrek Setia" />

            {/* --- SISI KIRI: FORM LOGIN --- */}
            <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white z-10 py-12">
                
                {/* Back Button - Disesuaikan posisinya agar di bawah Topbar GuestLayout */}
                <div className="mb-8">
                    <Link href="/" className="group inline-flex items-center gap-2 text-slate-400 hover:text-blue-900 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm mx-auto"
                >
                    {/* Brand Header */}
                    <div className="mb-10">
                        <div className="w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 mb-8">
                            <Flower2 size={32} />
                        </div>
                        <h2 className="text-4xl font-black text-blue-950 tracking-tighter leading-none">
                            Akses <br/> <span className="text-blue-600">Petugas.</span>
                        </h2>
                        <p className="text-slate-400 text-sm font-medium mt-4 leading-relaxed">
                            Sistem Informasi Posyandu (SIP) Terpadu <br/>
                            <strong>Anggrek Setia</strong> Kota Tangerang.
                        </p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Instansi</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                                    <User size={18} />
                                </span>
                                <input
                                    type="email"
                                    value={data.email}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-slate-300"
                                    placeholder="nama@tangerangkota.go.id"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kata Sandi</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    value={data.password}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-slate-300"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-slate-300 text-blue-900 focus:ring-blue-900/20 w-4 h-4"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-600">Ingat Saya</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800">
                                    Lupa Sandi?
                                </Link>
                            )}
                        </div>

                        <button 
                            disabled={processing}
                            className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            {processing ? 'Memverifikasi...' : 'Masuk ke Sistem'}
                        </button>
                    </form>

                    <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            Koneksi dienkripsi secara aman oleh server <br/> <span className="text-slate-600">Pemerintah Kota Tangerang</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* --- SISI KANAN: BRANDING --- */}
            <div className="hidden md:flex flex-1 bg-[#002d5f] relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>

                <div className="relative z-10 text-center space-y-8 max-w-lg">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl mb-4"
                    >
                        <img 
                            src="https://tangerangkota.go.id/favicon.ico" 
                            className="w-24 h-24 mx-auto brightness-0 invert opacity-90"
                            alt="Logo Kota Tangerang" 
                        />
                    </motion.div>
                    
                    <div className="space-y-3">
                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase">
                            Tangerang <span className="text-blue-400 italic">Ayo!</span>
                        </h3>
                        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
                        <p className="text-blue-100/60 text-[10px] font-black uppercase tracking-[0.5em]">
                            Dinas Kesehatan Kota Tangerang
                        </p>
                    </div>

                    <div className="flex justify-center gap-4 pt-8">
                        <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Server Utama Aktif</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 text-center">
                    <p className="text-blue-100/20 text-[10px] font-black uppercase tracking-[0.3em]">
                        SIP-TERPADU v2.0 • 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

// WAJIB: Hubungkan ke GuestLayout
Login.layout = (page) => <GuestLayout children={page} />;