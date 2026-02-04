<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('pemeriksaans', function (Blueprint $table) {
      $table->id();
      // Hubungkan ke tabel balitas
      $table->foreignId('balita_id')->constrained()->onDelete('cascade');
      $table->date('tgl_periksa');
      $table->decimal('berat_badan', 5, 2); // Contoh: 12.50 kg
      $table->decimal('tinggi_badan', 5, 2); // Contoh: 85.5 cm
      $table->decimal('lingkar_kepala', 5, 2)->nullable();
      $table->text('catatan')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('pemeriksaans');
  }
};
