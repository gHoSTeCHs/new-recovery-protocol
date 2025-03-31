<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recovery_messages', function (Blueprint $table) {
            $table->id();
            $table->unique('user_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('message_type')->default('error');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recovery_messages');
    }
};
