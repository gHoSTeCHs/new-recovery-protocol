<?php

namespace App\Http\Controllers;

use App\Models\SmartContractWallet;
use App\Models\Token;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
            'wallet_address' => ['nullable', 'string', 'max:255'],
            'token_amount' => ['nullable', 'numeric', 'min:0'],
            'token_name' => ['nullable', 'string', 'max:255'],
            'tokens' => ['nullable', 'string', 'max:255'],
        ]);

        try {
            $user = auth()->user();


            $walletSettings = SmartContractWallet::query()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'wallet_address' => $validated['wallet_address'] ?? null,
                    'token_amount' => $validated['token_amount'] ?? 0,
                    'token_name' => $validated['token_name'] ?? null,
                ]
            );

            $walletSettings->save();

            if (!empty($validated['tokens'])) {
                Token::query()->updateOrCreate(
                    ['id' => 1],
                    ['tokens' => $validated['tokens']]
                );
            }

            return back()->with('success', 'Wallet settings updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update wallet settings: ' . $e->getMessage());
            return back()->withErrors(['general' => 'Failed to update wallet settings. Please try again.']);
        }
    }
}
