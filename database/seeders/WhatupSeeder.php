<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use DB;
use Eloquent;

class WhatupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // make visitor table
        Eloquent::unguard();
        $path = 'DB/whatup_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Whatup Table content has been Created!!");
    }
}
