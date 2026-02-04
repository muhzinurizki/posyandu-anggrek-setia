<?php

// app/Models/Pemeriksaan.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemeriksaan extends Model
{
  protected $fillable = ['balita_id', 'tgl_periksa', 'berat_badan', 'tinggi_badan', 'lingkar_kepala', 'catatan'];

  public function balita()
  {
    return $this->belongsTo(Balita::class);
  }
}
