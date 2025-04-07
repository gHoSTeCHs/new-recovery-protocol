<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WalletAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    /**
     * Search for wallet addresses that contain the provided string
     *
     * @param Request $request
     * @param string $address Partial wallet address to search for
     * @return JsonResponse
     */
    public function walletAddressSearch(Request $request, string $address): JsonResponse
    {
        if (strlen($address) < 3) {
            return response()->json([
                "message" => "Search term must be at least 3 characters long",
            ], 400);
        }


        $walletAddresses = WalletAddress::query()
            ->where('wallet_address', 'LIKE', "%$address%")
            ->distinct('wallet_address')
            ->limit(100)
            ->get();

        if ($walletAddresses->isEmpty()) {
            return response()->json([
                "message" => "No matching addresses found",
            ], 404);
        }

        return response()->json([
            "addressResults" => $walletAddresses,
            "resultCount" => $walletAddresses->count(),
        ]);
    }
}
