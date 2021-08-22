<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\SubjectSeeder;
use Database\Seeders\TermSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SubjectSeeder::class
        ]);
        $this->call([
            TermSeeder::class
        ]);
        \App\Models\Teacher::factory(2)->create();
        \App\Models\Student::factory(2)->create();
    }
}
