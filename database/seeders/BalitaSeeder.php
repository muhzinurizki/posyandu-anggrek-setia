<?php

namespace Database\Seeders;

use App\Models\Balita;
use Illuminate\Database\Seeder;

class BalitaSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat data spesifik yang kamu inginkan (Real Data Manual)
        Balita::create([
            'nama_balita' => 'Arka Zayyan',
            'nik' => '3216012345678901',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2024-05-10',
            'nama_ibu' => 'Siti Aminah',
            'berat_badan_lahir' => 3.2,
            'tinggi_badan_lahir' => 50,
            'alamat' => 'Perumahan Anggrek Blok A1, Tangerang',
        ]);

        // 2. Buat 20 data tambahan secara otomatis menggunakan Factory
        Balita::factory()->count(20)->create();
    }
}