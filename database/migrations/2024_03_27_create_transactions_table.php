<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('wallet_address');
            $table->string('hash');
            $table->string('method');
            $table->string('block');
            $table->string('age');
            $table->string('from');
            $table->string('to');
            $table->string('amount');
            $table->string('fee');
            $table->string('direction')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
}; 