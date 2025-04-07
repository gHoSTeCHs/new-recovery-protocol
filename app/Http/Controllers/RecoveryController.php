<?php

namespace App\Http\Controllers;

use App\Models\RecoveryMessage;
use App\Models\SmartContractWallet;
use App\Models\Token;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RecoveryController extends Controller
{
    public function ethRecovery(): Response
    {
        $message = RecoveryMessage::query()->where('user_id', Auth::id())->first();
        $error = $message->message_type;

        $tokens = Token::query()->where('id', 1)->first();

        return Inertia::render('recovery/eth-recovery', [
            'messageType' => $error,
            'tokens' => $tokens->tokens,
        ]);
    }

    public function recoveryDetails(): JsonResponse
    {
        $details = SmartContractWallet::query()->where('user_id', 1)->first();

        return response()->json([
            'details' => $details
        ]);
    }
}
