<?php

use App\Models\Situation;
use Illuminate\Database\Seeder;

class SituationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Situation::create([
            'name' => 'Vulnerabilidade Ecológica'
        ]);

        Situation::create([
            'name' => 'Proteção Ambiental'
        ]);
    }
}
