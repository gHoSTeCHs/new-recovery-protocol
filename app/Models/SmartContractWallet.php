<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SmartContractWallet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'wallet_address',
        'token_amount',
        'wallet_name',
        'token_name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'token_amount' => 'decimal:8',
    ];

    /**
     * Get the user that owns the wallet token settings.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
