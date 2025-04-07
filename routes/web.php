<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EthController;
use App\Http\Controllers\RecoveryController;
use App\Http\Controllers\RecoveryMessageController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SmartContractWalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/eth-results/{address}', [EthController::class, 'index'])->name('results.eth');
    Route::get('/eth/recovery', [RecoveryController::class, 'ethRecovery'])->name('recovery.eth');
});

// Admin routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Transactions
    Route::get('/transactions/create', [AdminController::class, 'createTransactions'])->name('admin.transactions.create');
    Route::post('/transactions', [AdminController::class, 'storeTransactions'])->name('admin.transactions.store');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings.index');
    Route::put('/settings/smartcontract', [SmartContractWalletController::class, 'updateSmartContract'])
        ->name('settings.smart-contract.update');
    Route::post('/settings/recovery-message', [RecoveryMessageController::class, 'store'])->name('settings.recovery-message.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
