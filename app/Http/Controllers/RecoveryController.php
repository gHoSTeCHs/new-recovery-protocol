<?php

namespace App\Http\Controllers;

use App\Models\RecoveryMessage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RecoveryController extends Controller
{
    public function ethRecovery(): Response
    {
        $message = RecoveryMessage::query()->where('user_id', Auth::user()->id)->first();
        $error = $message->message_type;

        return Inertia::render('recovery/eth-recovery', [
            'messageType' => $error
        ]);
    }
}
