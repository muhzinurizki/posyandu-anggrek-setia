<?php

// app/Models/Balita.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
  protected $fillable = ['nama_balita', 'nik', 'tgl_lahir', 'jenis_kelamin', 'nama_ibu'];

  // PENTING: Definisi relasi ke tabel pemeriksaan
  public function pemeriksaans()
  {
    return $this->hasMany(Pemeriksaan::class);
  }
}
