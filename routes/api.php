<?php
use App\Http\Controllers\Member\ImageController;

Route::post('upload-image', [ImageController::class, 'upload'])->name('upload-image');
