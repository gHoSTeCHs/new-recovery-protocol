<?php

namespace App\Http\Controllers;

use App\Models\RecoveryMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RecoveryMessageController extends Controller
{
    /**
     * Store or update the recovery message settings.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message_type' => 'required|string|in:error,success',
        ]);

        $user = auth()->user();

        RecoveryMessage::query()->updateOrCreate(
            ['user_id' => $user->id],
            ['message_type' => $validated['message_type']]
        );

        return redirect()->back()->with('success', 'Recovery message settings updated successfully!');
    }
}
