<?php

namespace App\Http\Controllers;

use App\Models\Balita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class BalitaController extends Controller
{
    /**
     * Dashboard: Statistik Ringkas
     */
    public function dashboard()
    {
        $stats = [
            'total_balita' => Balita::count(),
            'laki_laki'    => Balita::where('jenis_kelamin', 'L')->count(),
            'perempuan'    => Balita::where('jenis_kelamin', 'P')->count(),
            'gizi_baik'    => '94%', // KMS logic placeholder
        ];

        $recent_activities = Balita::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recent_activities' => $recent_activities
        ]);
    }

    /**
     * Index: List Data dengan Pencarian & Pagination
     */
    public function index(Request $request)
    {
        return Inertia::render('Balita/Index', [
            'balitas' => Balita::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('nama_balita', 'like', "%{$search}%")
                          ->orWhere('nik', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Create: Menampilkan Form Pendaftaran (Halaman Mandiri)
     */
    public function create()
    {
        return Inertia::render('Balita/Create');
    }

    /**
     * Store: Proses Simpan Data
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_balita'        => 'required|string|max:255',
            'nik'                => 'required|string|size:16|unique:balitas,nik',
            'jenis_kelamin'      => 'required|in:L,P',
            'tanggal_lahir'      => 'required|date',
            'nama_ibu'           => 'required|string|max:255',
            'berat_badan_lahir'  => 'required|numeric|min:0',
            'tinggi_badan_lahir' => 'required|numeric|min:0',
            'alamat'             => 'required|string',
        ], [
            'nik.unique' => 'NIK ini sudah terdaftar dalam sistem.',
            'nik.size'   => 'NIK harus berjumlah 16 digit.',
            'required'   => 'Kolom :attribute wajib diisi.'
        ]);

        Balita::create($validated);
        
        return Redirect::route('balita.index')->with('message', 'Data balita berhasil didaftarkan!');
    }

    /**
     * Edit: Menampilkan Form Edit (Halaman Mandiri)
     */
    public function edit($id)
    {
        $balita = Balita::findOrFail($id);

        return Inertia::render('Balita/Edit', [
            'balita' => $balita
        ]);
    }

    /**
     * Update: Proses Perbarui Data
     */
    public function update(Request $request, $id)
    {
        $balita = Balita::findOrFail($id);

        $validated = $request->validate([
            'nama_balita'        => 'required|string|max:255',
            'nik'                => [
                'required',
                'string',
                'size:16',
                Rule::unique('balitas')->ignore($balita->id),
            ],
            'jenis_kelamin'      => 'required|in:L,P',
            'tanggal_lahir'      => 'required|date',
            'nama_ibu'           => 'required|string|max:255',
            'berat_badan_lahir'  => 'required|numeric|min:0',
            'tinggi_badan_lahir' => 'required|numeric|min:0',
            'alamat'             => 'required|string',
        ]);

        $balita->update($validated);

        return Redirect::route('balita.index')->with('message', 'Data balita berhasil diperbarui!');
    }

    /**
     * Destroy: Hapus Data
     */
    public function destroy($id)
    {
        try {
            $balita = Balita::findOrFail($id);
            $balita->delete();

            return Redirect::route('balita.index')->with('message', 'Data balita berhasil dihapus.');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Gagal menghapus data.');
        }
    }

    /**
     * Show: Detail & Riwayat Pemeriksaan
     */
    public function show($id)
    {
        // Jika belum ada relasi pemeriksaans, hapus part with() agar tidak error
        $balita = Balita::findOrFail($id);
        
        return Inertia::render('Balita/Show', [
            'balita' => $balita
        ]);
    }
}