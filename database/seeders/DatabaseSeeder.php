<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed data User (Kader)
        User::factory()->create([
            'name' => 'Admin Kader Anggrek',
            'email' => 'admin@anggrek.com',
            'password' => Hash::make('password'), // Password default agar mudah login
        ]);

        // 2. Panggil Seeder Balita yang sudah kita buat
        $this->call([
            BalitaSeeder::class,
        ]);
    }
}