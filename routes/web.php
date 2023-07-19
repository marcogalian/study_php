<?php

use App\Http\Controllers\CodeController;
use App\Http\Controllers\ProfileController;
use App\Models\Code;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'index' => Route::has('codes.index'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/codes/index', [CodeController::class, 'index'])->name('codes.index');
    Route::post('/codes', [CodeController::class, 'store'])->name('codes.store');
    Route::patch('/codes/{code}/update', [CodeController::class, 'update'])->name('codes.update');
    Route::delete('/codes/{code}/destroy', [CodeController::class, 'destroy'])->name('codes.destroy');
});

// Route::get('/codes/create', [CodeController::class, 'create'])->name('codes.create');

// Route::resource('codes', CodeController::class)
//     ->only(['index','store', 'update', 'destroy'])
//     ->middleware(['auth']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';