
<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EthController;
use App\Http\Controllers\RecoveryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/eth-results',[EthController::class, 'index'])->name('results.eth');
    Route::get('/eth/recovery', [RecoveryController::class, 'ethRecovery'])->name('recovery.eth');
});

// Admin routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/transactions/create', [AdminController::class, 'createTransactions'])->name('admin.transactions.create');
    Route::post('/transactions', [AdminController::class, 'storeTransactions'])->name('admin.transactions.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
