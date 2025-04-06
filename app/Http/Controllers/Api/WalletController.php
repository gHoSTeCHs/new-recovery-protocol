<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;

class WalletController extends Controller
{
    public function walletAddressSearch(string $address): JsonResponse
    {
        $walletAddress = Transaction::query()->where('wallet_address', 'LIKE', "{$address}")->get();

        if ($walletAddress->isEmpty()) {
            return response()->json([
                "message" => "Address not found",
            ], 404);
        }

        return response()->json([
            "addressResult" => $walletAddress,
        ]);
    }
}
