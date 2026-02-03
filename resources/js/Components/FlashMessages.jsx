import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function FlashMessages() {
    const { flash } = usePage().props;

    const showToast = (message, type) => {
        const isSuccess = type === 'success';
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            // Hilangkan backdrop: blur karena toast tidak mendukung backdrop
            // Kita gunakan inline style untuk glassmorphism yang lebih stabil
            html: `
                <div class="flex items-center gap-3 py-1">
                    <div class="flex-shrink-0 w-10 h-10 ${isSuccess ? 'bg-pink-100 text-pink-600' : 'bg-rose-100 text-rose-600'} rounded-xl flex items-center justify-center shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            ${isSuccess 
                                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>' 
                                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>'}
                        </svg>
                    </div>
                    <div class="text-left overflow-hidden">
                        <p class="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mb-0.5">${isSuccess ? 'Berhasil' : 'Terjadi Kesalahan'}</p>
                        <p class="text-[13px] font-bold text-slate-700 leading-tight truncate">${message}</p>
                    </div>
                </div>
            `,
            background: '#ffffff',
            customClass: {
                // Ukuran dikecilkan (max-width) agar tidak memenuhi layar
                popup: 'rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-3 !w-auto min-w-[280px] max-w-[350px]',
                timerProgressBar: isSuccess ? '!bg-pink-500' : '!bg-rose-500',
            },
            // Tambahkan agar toast berada di lapisan paling atas
            didOpen: (toast) => {
                toast.style.zIndex = '9999';
            }
        });
    };

    useEffect(() => {
        if (flash.message) showToast(flash.message, 'success');
        if (flash.error) showToast(flash.error, 'error');
        
        // Membersihkan flash setelah ditampilkan agar tidak muncul dua kali saat navigasi balik
        // (Opsional, tergantung setup Inertia kamu)
    }, [flash]);

    return null;
}