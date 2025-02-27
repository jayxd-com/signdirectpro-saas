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
        Schema::create('images', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Link to authenticated user
            $table->string('path');  // Path of the image stored in the storage folder
            $table->string('folder_name')->nullable();  // Virtual folder name
            $table->string('tags')->nullable();  // Tags associated with the image (comma-separated)
            $table->integer('width');
            $table->integer('height');
            $table->integer('dpi_width');
            $table->integer('dpi_height');
            $table->decimal('width_in_inches', 8, 2)->nullable();  // Store width in inches
            $table->decimal('height_in_inches', 8, 2)->nullable();  // Store height in inches
            $table->string('orientation')->nullable();
            $table->bigInteger('file_size');
            $table->string('mime_type');
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
