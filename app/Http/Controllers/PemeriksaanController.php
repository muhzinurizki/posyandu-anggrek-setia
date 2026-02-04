<?php

namespace App\Http\Controllers;

use App\Models\Pemeriksaan;
use App\Models\Balita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemeriksaanController extends Controller
{
    public function index(Request $request)
    {
        $pemeriksaans = Pemeriksaan::with('balita')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('balita', function ($q) use ($search) {
                    $q->where('nama_balita', 'like', "%{$search}%");
                });
            })
            ->latest('tgl_periksa')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Pemeriksaan/Index', [
            'pemeriksaans' => $pemeriksaans,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pemeriksaan/Create', [
            'balitas' => Balita::select('id', 'nama_balita', 'nik')->orderBy('nama_balita')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'balita_id'      => 'required|exists:balitas,id',
            'tgl_periksa'    => 'required|date',
            'berat_badan'    => 'required|numeric|min:0',
            'tinggi_badan'   => 'required|numeric|min:0',
            'lingkar_kepala' => 'nullable|numeric|min:0',
            'catatan'        => 'nullable|string',
        ]);

        Pemeriksaan::create($validated);

        return redirect()->route('pemeriksaan.index')->with('success', 'Data pemeriksaan berhasil dicatat!');
    }

    public function destroy(Pemeriksaan $pemeriksaan)
    {
        $pemeriksaan->delete();
        return back()->with('success', 'Data berhasil dihapus');
    }
}