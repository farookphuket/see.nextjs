<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class ReadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // make read table
        Eloquent::unguard();
        $path = 'DB/read_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Read Table content has been Created!!");
    }
}
