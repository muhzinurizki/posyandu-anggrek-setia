<?php

namespace App\Http\Controllers;

use App\Models\Balita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class BalitaController extends Controller
{
    /**
     * Menampilkan Dashboard Utama (Ringkasan Statistik)
     */
    public function dashboard()
    {
        // Mengambil data statistik secara efisien
        $stats = [
            'total_balita' => Balita::count(),
            'laki_laki'    => Balita::where('jenis_kelamin', 'L')->count(),
            'perempuan'    => Balita::where('jenis_kelamin', 'P')->count(),
            // Contoh data gizi (ini bisa dibuat dinamis nanti setelah modul pemeriksaan siap)
            'gizi_baik'    => '94%', 
        ];

        // Mengambil 5 aktivitas pendaftaran terbaru untuk feed dashboard
        $recent_activities = Balita::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recent_activities' => $recent_activities
        ]);
    }

    /**
     * Menampilkan Halaman Manajemen Data Balita (Tabel & Filter)
     */
    public function index(Request $request)
    {
        // Fitur Pencarian (Opsional, sangat berguna jika data sudah banyak)
        $query = Balita::query();

        if ($request->has('search')) {
            $query->where('nama_balita', 'like', '%' . $request->search . '%')
                  ->orWhere('nik', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Balita/Index', [
            'balitas' => $query->latest()->get(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Menyimpan data balita baru ke database
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_balita'       => 'required|string|max:255',
            'nik'               => 'required|string|size:16|unique:balitas,nik',
            'jenis_kelamin'     => 'required|in:L,P',
            'tanggal_lahir'     => 'required|date',
            'nama_ibu'          => 'required|string|max:255',
            'berat_badan_lahir' => 'required|numeric|min:0',
            'tinggi_badan_lahir'=> 'required|numeric|min:0',
            'alamat'            => 'required|string',
        ], [
            // Custom Error Messages agar UI lebih ramah
            'nik.unique' => 'NIK ini sudah terdaftar dalam sistem.',
            'nik.size'   => 'NIK harus berjumlah 16 digit.',
            'required'   => 'Kolom :attribute wajib diisi.'
        ]);

        try {
            Balita::create($validated);
            
            return Redirect::route('balita.index')->with('message', 'Data balita berhasil ditambahkan!');
        } catch (\Exception $e) {
            return Redirect::back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.']);
        }
    }

    /**
     * Menghapus data balita
     */
    public function destroy($id)
    {
        $balita = Balita::findOrFail($id);
        $balita->delete();

        return Redirect::route('balita.index')->with('message', 'Data balita berhasil dihapus.');
    }

    /**
     * Menampilkan detail balita (untuk Modul Pemeriksaan/KMS nantinya)
     */
    public function show($id)
    {
        $balita = Balita::with('pemeriksaans')->findOrFail($id);
        
        return Inertia::render('Balita/Show', [
            'balita' => $balita
        ]);
    }
}