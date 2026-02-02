<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // 1. Pastikan ini di-import
use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    use HasFactory; // 2. Pastikan ini dipasang di dalam class

    // Jangan lupa masukkan fillable agar data bisa masuk
    protected $fillable = [
        'nama_balita',
        'nik',
        'jenis_kelamin',
        'tanggal_lahir',
        'nama_ibu',
        'berat_badan_lahir',
        'tinggi_badan_lahir',
        'alamat',
    ];
}