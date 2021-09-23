<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formrequests', function (Blueprint $table) {
            $table->id();
            $table->longText('value');
            $table->foreignId('formulaire_input_id')->constrained('formulaire_input')->default('');
            $table->foreignId('tentative_id')->constrained('tentatives')->default('');
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
        Schema::dropIfExists('formrequests');
    }
}
