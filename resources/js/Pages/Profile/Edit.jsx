import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { User, Lock, Trash2, ShieldCheck } from "lucide-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user} // Sekarang auth.user sudah bisa terbaca
            header={
                <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-xl text-pink-600">
                        <ShieldCheck size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                        Pengaturan Profil
                    </h2>
                </div>
            }
        >
            <Head title="Profil Saya" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-8">
                    {/* Section 1: Update Info Profil */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-300/40">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-white flex items-center gap-3">
                            <User size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">
                                Informasi Pribadi
                            </span>
                        </div>
                        <div className="p-8">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Section 2: Ganti Password */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-300/40">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-4 text-white flex items-center gap-3">
                            <Lock size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">
                                Keamanan Akun
                            </span>
                        </div>
                        <div className="p-8">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Section 3: Hapus Akun */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-rose-100 overflow-hidden transition-all border-dashed">
                        <div className="bg-rose-50 px-8 py-4 text-rose-600 flex items-center gap-3 border-b border-rose-100">
                            <Trash2 size={18} />
                            <span className="text-xs font-black uppercase tracking-widest text-rose-500">
                                Zona Bahaya
                            </span>
                        </div>
                        <div className="p-8">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Footer Info */}
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        Sistem Informasi Posyandu &bull; Versi 1.0.0
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
