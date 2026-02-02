import { Link, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Baby, Calendar, ClipboardCheck, Heart, LayoutDashboard, 
    MapPin, Phone, ChevronRight, Users, ArrowRight, Sparkles,
    Activity, ShieldCheck, Star, Bell, Search
} from 'lucide-react';

export default function Welcome({ auth }) {
    // Variabel Animasi
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <>
            <Head title="Posyandu Anggrek Setia - Modern Healthcare" />
            
            <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
                
                {/* --- BACKGROUND ORNAMENT --- */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <motion.div 
                        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[120px]" 
                    />
                    <motion.div 
                        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]" 
                    />
                </div>

                {/* --- STICKY NAVIGATION --- */}
                <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div 
                                whileHover={{ rotate: 15 }}
                                className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-xl shadow-lg shadow-pink-200"
                            >
                                <Heart className="text-white" size={24} />
                            </motion.div>
                            <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">
                                Anggrek<span className="text-pink-600 underline decoration-pink-200 decoration-4 underline-offset-4">Setia</span>
                            </span>
                        </Link>
                        
                        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-600">
                            <a href="#layanan" className="hover:text-pink-600 transition">Layanan</a>
                            <a href="#jadwal" className="hover:text-pink-600 transition">Jadwal</a>
                            <a href="#faq" className="hover:text-pink-600 transition">Bantuan</a>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white font-bold hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center gap-2 active:scale-95">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="hidden sm:block text-slate-600 font-bold hover:text-pink-600 transition">Masuk</Link>
                                    <Link href={route('register')} className="px-6 py-3 rounded-2xl bg-pink-600 text-white font-bold hover:bg-pink-700 hover:shadow-lg shadow-pink-200 transition flex items-center gap-2 active:scale-95">
                                        Daftar <ArrowRight size={18} />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* --- HERO SECTION --- */}
                <section className="relative pt-16 pb-20 px-6">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div 
                            initial="hidden" animate="visible" variants={containerVariants}
                            className="lg:col-span-7"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-100 shadow-sm text-pink-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={14} className="animate-pulse" /> Digitalisasi Posyandu RW 05
                            </motion.div>
                            <motion.h1 variants={itemVariants} className="text-6xl sm:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
                                Tumbuh Sehat, <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 italic">Masa Depan</span> Hebat.
                            </motion.h1>
                            <motion.p variants={itemVariants} className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                                Selamat datang di portal resmi Posyandu Anggrek Setia. Kami hadir untuk memastikan setiap anak mendapatkan pemantauan gizi dan kesehatan terbaik.
                            </motion.p>
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <a href="#jadwal" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl shadow-slate-200">
                                    Cek Jadwal Rutin
                                </a>
                                <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                    <div className="flex -space-x-3">
                                        {[1,2,3].map(i => (
                                            <img key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100" src={`https://i.pravatar.cc/100?img=${i+20}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 tracking-tight">150+ Ibu Terdaftar</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl border border-slate-50 overflow-hidden group">
                                <img 
                                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop" 
                                    className="rounded-[2.5rem] w-full h-[500px] object-cover group-hover:scale-105 transition duration-700" 
                                    alt="Health Professional" 
                                />
                                <motion.div 
                                    animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute top-10 right-10 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3"
                                >
                                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><ShieldCheck size={20}/></div>
                                    <span className="font-black text-xs uppercase tracking-wider">Terverifikasi Dinkes</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- BENTO GRID FEATURES --- */}
                <section id="layanan" className="py-20 px-6 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                        <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 row-span-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[3rem] p-12 text-white flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-2xl shadow-pink-200">
                            <Baby size={180} className="absolute -top-10 -right-10 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                            <h3 className="text-5xl font-black mb-4 tracking-tighter">E-KMS <br /> Digital</h3>
                            <p className="opacity-80 text-lg max-w-xs leading-snug font-medium">Lupakan buku fisik. Pantau grafik pertumbuhan berat dan tinggi badan si kecil langsung dari smartphone Bunda.</p>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2 bg-blue-500 rounded-[3rem] p-8 text-white flex items-center gap-6 shadow-xl shadow-blue-100 cursor-pointer">
                            <div className="bg-white/20 p-5 rounded-3xl"><Bell size={32} /></div>
                            <div>
                                <h4 className="text-2xl font-black tracking-tight">Pengingat Otomatis</h4>
                                <p className="opacity-80 font-medium leading-tight text-sm">Notifikasi otomatis jadwal imunisasi dan vitamin A via WhatsApp.</p>
                            </div>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="bg-emerald-500 rounded-[3rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-emerald-100 cursor-pointer">
                            <ClipboardCheck size={32} />
                            <h4 className="text-xl font-black leading-tight tracking-tight">Catatan Vaksinasi Terstruktur</h4>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-slate-200 cursor-pointer">
                            <Users size={32} className="text-pink-500" />
                            <h4 className="text-xl font-black leading-tight tracking-tight text-white">Konsultasi Kader Terpadu</h4>
                        </motion.div>
                    </div>
                </section>

                {/* --- JADWAL SECTION --- */}
                <section id="jadwal" className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-[3.5rem] p-8 md:p-16 border border-slate-100 shadow-2xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-[5rem] -z-0" />
                            <div className="z-10 text-center md:text-left flex-1">
                                <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-black uppercase mb-4">Jadwal Terdekat</div>
                                <h2 className="text-4xl font-black text-slate-900 mb-2">12 Februari 2026</h2>
                                <p className="text-slate-500 font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                                    <MapPin size={18} className="text-pink-600" /> Balai Warga RW 05 (08:00 - 11:00)
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {['Penimbangan Berat Badan', 'Pengukuran Tinggi Badan', 'Pemberian Vitamin A'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-500" /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full md:w-auto px-10 py-4 bg-pink-600 text-white rounded-2xl font-black hover:bg-pink-700 transition shadow-lg shadow-pink-100">
                                    Simpan di Kalender
                                </button>
                            </div>
                            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hidden lg:block">
                                <Calendar size={100} className="text-slate-200" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- LIVE STATS --- */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { l: "Bayi Sehat", v: "150", i: <Baby />, c: "text-pink-500" },
                            { l: "Imunisasi Lunas", v: "98%", i: <ShieldCheck />, c: "text-blue-500" },
                            { l: "Kader Aktif", v: "12", i: <Users />, c: "text-emerald-500" },
                            { l: "Tahun Melayani", v: "8+", i: <Star />, c: "text-orange-500" }
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} className="text-center">
                                <div className={`inline-flex mb-4 ${s.c}`}>{s.i}</div>
                                <div className="text-4xl font-black text-slate-900">{s.v}</div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- FAQ SECTION --- */}
                <section id="faq" className="py-24 px-6 bg-slate-50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-center mb-12 tracking-tight">Ada Pertanyaan?</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Apa saja syarat pendaftaran balita baru?", a: "Cukup bawa fotokopi KK dan Buku KIA (Buku Pink) saat jadwal Posyandu berlangsung." },
                                { q: "Bagaimana jika saya lupa membawa buku KIA?", a: "Data tetap bisa dicatat oleh kader di sistem digital ini, namun buku fisik tetap disarankan untuk dibawa." },
                                { q: "Apakah layanan ini berbayar?", a: "Seluruh layanan Posyandu Anggrek Setia tidak dipungut biaya (GRATIS)." }
                            ].map((f, i) => (
                                <details key={i} className="group bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
                                    <summary className="flex justify-between items-center p-7 cursor-pointer font-black text-slate-800 list-none">
                                        {f.q}
                                        <ChevronRight size={20} className="text-pink-600 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <div className="px-7 pb-7 text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-4">
                                        {f.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="bg-white border-t border-slate-100 py-16 px-6">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                <div className="bg-pink-600 p-1.5 rounded-lg text-white"><Heart size={18} /></div>
                                <span className="text-xl font-black tracking-tighter uppercase">Anggrek Setia</span>
                            </div>
                            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">Mewujudkan lingkungan RW 05 yang sehat, cerdas, dan tanggap terhadap tumbuh kembang anak.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-pink-50 hover:text-pink-600 transition cursor-pointer">
                                    <Phone size={20} />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer">
                                    <MapPin size={20} />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">© 2026 Posyandu Digital System</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}