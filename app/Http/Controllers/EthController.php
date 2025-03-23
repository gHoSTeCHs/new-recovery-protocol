<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class EthController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('results/eth-results');
    }
}
