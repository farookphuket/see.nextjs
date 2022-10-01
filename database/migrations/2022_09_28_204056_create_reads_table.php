<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reads', function (Blueprint $table) {
            $table->id();
            $table->string('ip');
            $table->string('os');
            $table->string('browser');
            $table->string('device');
            $table->timestamps();
        });

        // read table has created after whatup table
        Schema::create('read_whatup', function (Blueprint $table) {
            $table->id();
            $table->string('ip');
            $table->foreignId('whatup_id')->constrained()->onDelete('cascade');
            $table->foreignId('read_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reads');
        Schema::dropIfExists('read_whatup');
    }
};
