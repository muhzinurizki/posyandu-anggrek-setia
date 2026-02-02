<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BalitaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated & Verified Routes (Core Application)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard: Mengarah ke fungsi dashboard di Controller (Statistik)
    Route::get('/dashboard', [BalitaController::class, 'dashboard'])->name('dashboard');

    // Manajemen Balita: Menggunakan Resource agar otomatis mendukung Index, Create, Store, Edit, Update, Destroy
    // Saat ini kita fokus ke index, store, dan destroy sesuai kebutuhan modul
    Route::resource('balita', BalitaController::class)->only([
        'index', 'store', 'destroy', 'show'
    ]);

    // Modul Pemeriksaan / KMS (Placeholder untuk fitur selanjutnya)
    // Route::post('/pemeriksaan', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');

});

/*
|--------------------------------------------------------------------------
| User Profile Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';