<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Member\MemberProductController;


use Intervention\Image\Laravel\Facades\Image;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::prefix('member')->name('member.')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('member/dashboard');
        })->name('dashboard');


        Route::prefix('image-manager')->name('image-manager.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('member/image-manager/index');
            })->name('index');
        });

        Route::get('product/{id}', [MemberProductController::class, 'show'])->name('product.show');
    });
});

Route::get('test-image', function (){
    dd(auth()->user()->id);
    $size = Storage::disk('public')->mimeType('images/1gfUeikOZE5ravNdgK4Z1pea3OmdsWbosCYc4aLZ.png');
   $img = Image::read(storage_path(). '/app/public/images/1gfUeikOZE5ravNdgK4Z1pea3OmdsWbosCYc4aLZ.png');
    dd($img->encode(), $size);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
