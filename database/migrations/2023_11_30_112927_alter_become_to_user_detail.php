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
        Schema::table('user_detail', function (Blueprint $table) {
            $table->enum('become_pandit', ['NA', 'pending', 'approved','rejected','block'])->after('profile_id')->default('NA')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_detail', function (Blueprint $table) {
            //
        });
    }
};