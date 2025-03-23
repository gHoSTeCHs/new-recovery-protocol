<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class EthController extends Controller
{
    public function index()
    {
        return Inertia::render('results/eth-results');
    }
}
