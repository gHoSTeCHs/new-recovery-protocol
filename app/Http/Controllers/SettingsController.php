<?php

namespace App\Http\Controllers;

use App\Models\SmartContractWallet;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $walletSettings = $user->walletTokenSetting ?? new SmartContractWallet();

        return Inertia::render('admin/settings', [
            'walletSettings' => [
                'initialWalletAddress' => $walletSettings->wallet_address,
                'initialTokenAmount' => $walletSettings->token_amount,
                'walletName' => $walletSettings->wallet_name ?? 'Primary Wallet',
                'tokenName' => $walletSettings->token_name ?? 'Tokens',
            ]]);
    }
}
