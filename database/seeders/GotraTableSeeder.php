<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GotraTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void 
    {
        $names = [
            'Atri',
            'Bharadvaja',
            'Bhrigu',
            'Gotama',
            'Kashyapa',
            'Vasishtha',
            'Vishvamitra',
        ];

        foreach ($names as $name) {
            DB::table('gotra')->insert([
                'name' => $name,
            ]);
        }
    }
}
