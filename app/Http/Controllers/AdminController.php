<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\WalletAddress;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function createTransactions(): Response
    {
        return Inertia::render('admin/create-transactions');
    }

    public function storeTransactions(Request $request): RedirectResponse
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

        DB::beginTransaction();
        try {

            $check = WalletAddress::query()->where('wallet_address', $validated['wallet_address'])->first();

            if (!$check) {
                WalletAddress::query()->create([
                    'wallet_address' => $validated['wallet_address'],
                ]);
            }

            foreach ($validated['transactions'] as $transaction) {
                Transaction::query()->create([
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

            DB::commit();
            return redirect()->back()->with('success', 'Transactions created successfully');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create transactions: ' . $e->getMessage());
        }
    }
}
