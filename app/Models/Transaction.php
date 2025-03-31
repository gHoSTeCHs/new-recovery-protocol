<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'wallet_address',
        'hash',
        'method',
        'block',
        'age',
        'from',
        'to',
        'amount',
        'fee',
        'direction',
    ];

    protected $casts = [
        'direction' => 'string',
    ];
} 