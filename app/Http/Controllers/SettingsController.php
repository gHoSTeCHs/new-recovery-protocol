<?php

namespace App\Http\Controllers;

use App\Models\SmartContractWallet;
use App\Models\Token;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $walletSettings = $user->smartContractDetails ?? new SmartContractWallet();
        $recoveryMessageType = $user->recoveryMessage?->message_type ?? 'error';
        $tokens = Token::query()->where('id', 1)->first();

        return Inertia::render('admin/settings', [
            'walletSettings' => [
                'initialWalletAddress' => $walletSettings->wallet_address,
                'initialTokenAmount' => $walletSettings->token_amount,
                'walletName' => $walletSettings->wallet_name ?? 'Primary Wallet',
                'tokenName' => $walletSettings->token_name ?? 'Tokens',
                'tokens' => $tokens->tokens,
            ],
            'initialMessageType' => $recoveryMessageType,
        ]);
    }
}
