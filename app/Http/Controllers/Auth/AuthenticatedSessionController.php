<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Balita;

class AuthenticatedSessionController extends Controller
{
  public function index()
  {
    return Inertia::render('Dashboard', [
      'stats' => [
        'total_balita' => Balita::count(),
        'laki_laki'    => Balita::where('jenis_kelamin', 'L')->count(),
        'perempuan'    => Balita::where('jenis_kelamin', 'P')->count(),
        'baru_bulan_ini' => Balita::whereMonth('created_at', now()->month)->count(),
      ],
      // Data untuk grafik (contoh sederhana rata-rata berat badan per bulan)
      'chartData' => [
        'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        'data'   => [5.2, 6.1, 6.8, 7.5, 8.2, 8.9] // Nanti ini bisa diambil dari tabel pemeriksaan
      ]
    ]);
  }
  /**
   * Display the login view.
   */
  public function create(): Response
  {
    return Inertia::render('Auth/Login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => session('status'),
    ]);
  }

  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    $request->authenticate();

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
  }
}
