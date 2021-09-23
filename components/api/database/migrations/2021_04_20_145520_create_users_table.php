<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('address');
            $table->string('photo');
            // $table->string('role');
            $table->foreignId('etablissement_id')->constrained('etablissements')->default('1')->nullable();

            // $table->foreignId('role_id')->constrained('roles')->default('1');


            // $table->foreign('etablissement_id')->references('id')->on('etablissements');
            // $table->foreignId('etablissement_id')->constrained();
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
        Schema::dropIfExists('users');
    }
}
