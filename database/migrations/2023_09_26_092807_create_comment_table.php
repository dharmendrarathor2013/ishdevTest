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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->text('comment');
            $table->boolean('status');
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('post')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            // $table->foreign('user_id')->references('id')->on('users')
            //     ->onDelete('cascade')
            //     ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
