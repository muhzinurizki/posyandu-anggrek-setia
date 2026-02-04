import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ChevronLeft,
    Calendar,
    User,
    Scale,
    Ruler,
    Activity,
    FileText,
    Printer,
    Edit,
} from "lucide-react";

export default function Show({ auth, pemeriksaan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Detail Rekam Medis
                    </h2>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        Informasi Pertumbuhan Balita
                    </p>
                </div>
            }
        >
            <Head title={`Detail - ${pemeriksaan.balita?.nama_balita}`} />

            <div className="py-6 max-w-4xl mx-auto space-y-6">
                {/* --- TOP BAR --- */}
                <div className="flex justify-between items-center">
                    <Link
                        href={route("pemeriksaan.index")}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                        <ChevronLeft size={16} /> Kembali
                    </Link>

                    <div className="flex gap-2">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                            <Printer size={14} /> Cetak
                        </button>
                        <Link
                            href={route("pemeriksaan.edit", pemeriksaan.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                        >
                            <Edit size={14} /> Koreksi Data
                        </Link>
                    </div>
                </div>

                {/* --- MAIN CONTENT CARD --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Header Profil Balita */}
                    <div className="bg-slate-900 p-8 text-white relative">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <User size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        {pemeriksaan.balita?.nama_balita}
                                    </h3>
                                    <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mt-1">
                                        NIK: {pemeriksaan.balita?.nik}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                                    Tanggal Periksa
                                </p>
                                <p className="text-sm font-bold">
                                    {new Date(
                                        pemeriksaan.tgl_periksa,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        {/* Abstract background shape */}
                        <div className="absolute top-0 right-0 w-32 h-full bg-blue-600/10 -skew-x-12 translate-x-16"></div>
                    </div>

                    {/* Statistik Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-b border-slate-100">
                        <DataBox
                            icon={<Scale className="text-blue-600" size={20} />}
                            label="Berat Badan"
                            value={`${pemeriksaan.berat_badan} Kg`}
                        />
                        <DataBox
                            icon={
                                <Ruler className="text-emerald-600" size={20} />
                            }
                            label="Tinggi Badan"
                            value={`${pemeriksaan.tinggi_badan} Cm`}
                        />
                        <DataBox
                            icon={
                                <Activity className="text-rose-600" size={20} />
                            }
                            label="Lingkar Kepala"
                            value={
                                pemeriksaan.lingkar_kepala
                                    ? `${pemeriksaan.lingkar_kepala} Cm`
                                    : "-"
                            }
                        />
                    </div>

                    {/* Catatan Medis */}
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText size={18} className="text-slate-400" />
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                                Catatan Petugas
                            </h4>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                            {pemeriksaan.catatan ||
                                "Tidak ada catatan tambahan untuk pemeriksaan ini."}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Input oleh: {auth.user.name}</span>
                        <span>
                            ID Transaksi: #KMS-
                            {pemeriksaan.id.toString().padStart(5, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function DataBox({ icon, label, value }) {
    return (
        <div className="p-8 flex flex-col items-center text-center group hover:bg-slate-50 transition-colors">
            <div className="mb-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {label}
            </p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">{value}</h4>
        </div>
    );
}
