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
    Schema::create('balitas', function (Blueprint $table) {
      $table->id();
      $table->string('nama_balita');
      $table->string('nik', 16)->unique();
      $table->enum('jenis_kelamin', ['L', 'P']);
      $table->date('tanggal_lahir');
      $table->string('nama_ibu');
      $table->text('alamat');
      $table->decimal('berat_badan_lahir', 5, 2); // dalam kg
      $table->decimal('tinggi_badan_lahir', 5, 2); // dalam cm
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('balitas');
  }
};
