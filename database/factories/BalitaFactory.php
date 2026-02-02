<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Balita>
 */
class BalitaFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  // Buka database/factories/BalitaFactory.php

  public function definition(): array
  {
    $faker = \Faker\Factory::create('id_ID');
    $gender = $this->faker->randomElement(['L', 'P']);

    return [
      'nama_balita' => $faker->name($gender === 'L' ? 'male' : 'female'),
      // Pastikan jumlah # tepat 16 digit
      'nik' => $faker->unique()->numerify('3216############'),
      'jenis_kelamin' => $gender,
      'tanggal_lahir' => $faker->date('Y-m-d', '-1 years'),
      'nama_ibu' => $faker->name('female'),
      'berat_badan_lahir' => $faker->randomFloat(2, 2.5, 4.0),
      'tinggi_badan_lahir' => $faker->randomFloat(2, 45, 52),
      'alamat' => $faker->address,
    ];
  }
}
