<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class RecoveryController extends Controller
{
    public function ethRecovery()
    {
        return Inertia::render('recovery/eth-recovery');
    }
}
