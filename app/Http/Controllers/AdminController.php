<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function createTransactions()
    {
        return Inertia::render('admin/create-transactions');
    }

    public function storeTransactions(Request $request)
    {
        $validated = $request->validate([
            'wallet_address' => 'required|string',
            'transactions' => 'required|array',
            'transactions.*.hash' => 'required|string',
            'transactions.*.method' => 'required|string',
            'transactions.*.block' => 'required|string',
            'transactions.*.age' => 'required|string',
            'transactions.*.from' => 'required|string',
            'transactions.*.to' => 'required|string',
            'transactions.*.amount' => 'required|string',
            'transactions.*.fee' => 'required|string',
            'transactions.*.direction' => 'nullable|in:IN,OUT',
        ]);

        
        foreach ($validated['transactions'] as $transaction) {
            Transaction::create([
                'wallet_address' => $validated['wallet_address'],
                'hash' => $transaction['hash'],
                'method' => $transaction['method'],
                'block' => $transaction['block'],
                'age' => $transaction['age'],
                'from' => $transaction['from'],
                'to' => $transaction['to'],
                'amount' => $transaction['amount'],
                'fee' => $transaction['fee'],
                'direction' => $transaction['direction'] ?? null,
            ]);
        }

        return redirect()->back()->with('success', 'Transactions created successfully');
    }
} 