<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Inertia\Inertia;
use Inertia\Response;

class EthController extends Controller
{
    public function index(string $address): Response
    {
        $addressTransactions = Transaction::query()->where('wallet_address', $address)->get();
        return Inertia::render('results/eth-results', [
            'address' => $address,
            'addressTransactions' => $addressTransactions,
        ]);

    }
}
