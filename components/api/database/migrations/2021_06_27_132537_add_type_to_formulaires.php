<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeToFormulaires extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('formulaires', function (Blueprint $table) {
            $table->string('formtype')->nullable()->default(null);
            $table->boolean('accepted')->nullable()->default(null);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('formulaires', function (Blueprint $table) {
            $table->dropColumn('formtype');
            $table->dropColumn('accepted');
        });
    }
}
