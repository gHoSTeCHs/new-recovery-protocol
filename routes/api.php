<?php

use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\RecoveryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('api')->group(function () {
    Route::get('/walletresults/{address}', [WalletController::class, 'walletAddressSearch']);

    Route::get('/recoverydetails', [RecoveryController::class, 'recoveryDetails']);
});

