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
        Schema::table('community_detail', function (Blueprint $table) {
            $table->renameColumn('upload_licence', 'upload_licence01');
            $table->string('upload_licence02')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('community_detail', function (Blueprint $table) {
            $table->renameColumn('upload_licence', 'upload_licence01');
            $table->string('upload_licence02')->nullable();
        });
    }
};
