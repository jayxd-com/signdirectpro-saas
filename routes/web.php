<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Member\MemberProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::prefix('member')->name('.member')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('member/dashboard');
        })->name('dashboard');


        Route::get('product/{id}', [MemberProductController::class,'show'])->name('product.show');
    });
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
