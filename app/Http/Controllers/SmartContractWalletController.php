<?php

namespace App\Http\Controllers;

use App\Models\SmartContractWallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SmartContractWalletController extends Controller
{
    public function index(): Response
    {
        $walletSettings = auth()->user()->smartContractDetails ?? new SmartContractWallet();

        return Inertia::render('Settings/UpdatePaymentDetails', [
            'initialWalletAddress' => $walletSettings->wallet_address,
            'initialTokenAmount' => $walletSettings->token_amount,
            'walletName' => $walletSettings->wallet_name,
            'tokenName' => $walletSettings->token_name,
        ]);
    }

    /**
     * Update the wallet token settings.
     */
    public function updateSmartContract(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'wallet_address' => 'nullable|string|max:255',
            'token_amount' => 'nullable|numeric|min:0',
            'token_name' => 'nullable|string|max:255',
        ]);

        $user = auth()->user();
        $walletSettings = $user->smartContractDetails;

        if (!$walletSettings) {
            // Create new settings if they don't exist
            $walletSettings = new SmartContractWallet();
            $walletSettings->user_id = $user->id;
        }

        $walletSettings->wallet_address = $validated['wallet_address'] ?? null;
        $walletSettings->token_amount = $validated['token_amount'] ?? 0;
        $walletSettings->token_name = $validated['token_name'] ?? null;

        $walletSettings->save();

        return back()->with('success', 'Wallet settings updated successfully.');
    }
}
