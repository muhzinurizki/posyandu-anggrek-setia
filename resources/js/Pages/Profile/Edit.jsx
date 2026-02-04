import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { User, Lock, Trash2, ShieldCheck, Settings2 } from "lucide-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                            <Settings2 size={20} />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                            Pengaturan Profil
                        </h2>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 ml-12">
                        Kelola informasi akun dan keamanan sistem
                    </p>
                </div>
            }
        >
            <Head title="Profil Saya" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-10">
                    
                    {/* --- SECTION 1: INFORMASI PROFIL --- */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden group">
                        <div className="bg-[#001a33] px-10 py-5 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <User size={18} className="text-blue-400" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                                    Data Identitas Petugas
                                </span>
                            </div>
                            <ShieldCheck size={16} className="text-blue-500/50" />
                        </div>
                        <div className="p-10">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* --- SECTION 2: KEAMANAN --- */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                        <div className="bg-[#002d5f] px-10 py-5 text-white flex items-center gap-3">
                            <Lock size={18} className="text-blue-400" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                                Protokol Kata Sandi
                            </span>
                        </div>
                        <div className="p-10">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* --- SECTION 3: DANGER ZONE --- */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-rose-100 overflow-hidden border-dashed">
                        <div className="bg-rose-50/50 px-10 py-5 text-rose-600 flex items-center justify-between border-b border-rose-100">
                            <div className="flex items-center gap-3">
                                <Trash2 size={18} />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                                    Penghapusan Akses Sistem
                                </span>
                            </div>
                            <span className="text-[9px] font-black bg-rose-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                                Irreversible
                            </span>
                        </div>
                        <div className="p-10">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* --- FOOTER COMPLIANCE --- */}
                    <div className="flex flex-col items-center gap-4 pt-6">
                        <div className="h-[1px] w-20 bg-slate-200"></div>
                        <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                            Otoritas Data &bull; Kota Tangerang &bull; 2026
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}