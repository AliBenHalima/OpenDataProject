<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormulaireInputTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formulaire_input', function (Blueprint $table) {
            $table->id();
            $table->boolean('required');
            $table->foreignId('formulaire_id')->constrained('formulaires')->default('');
            $table->foreignId('input_id')->constrained('inputs')->default('');
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
        Schema::dropIfExists('formulaire_input');
    }
}
