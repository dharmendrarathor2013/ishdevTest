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
        Schema::create('community_arti', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('community_detail_id')->nullable()->index('community_detailConstraint');
            $table->string('live_arti_link')->nullable();
            $table->string('arti_time')->nullable();
            $table->timestamp('created_at')->useCurrentOnUpdate()->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->softDeletes()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('community_arti');
    }
};