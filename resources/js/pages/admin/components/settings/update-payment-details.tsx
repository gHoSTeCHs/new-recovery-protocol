import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AddressChain from '@/helpers/walletAddressChain';
import { useForm } from '@inertiajs/react';
import { CheckCircle2, Coins, Info, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const cryptoChains = [
    { fullName: 'Ethereum', value: 'ETH' },
    { fullName: 'Bitcoin', value: 'BTC' },
    { fullName: 'Solana', value: 'SOL' },
    { fullName: 'Cardano', value: 'ADA' },
    { fullName: 'Polygon', value: 'MATIC' },
    { fullName: 'Binance Smart Chain', value: 'BNB' },
    { fullName: 'Avalanche', value: 'AVAX' },
    { fullName: 'Polkadot', value: 'DOT' },
    { fullName: 'Tron', value: 'TRX' },
    { fullName: 'Ripple', value: 'XRP' },
    { fullName: 'Cosmos', value: 'ATOM' },
    { fullName: 'Algorand', value: 'ALGO' },
];

interface WalletTokenSettingsProps {
    initialWalletAddress?: string;
    initialTokenAmount?: number | null;
    initialTokenType?: string;
    initialTokens?: string;
    walletName?: string;
    tokenName?: string;
}

const WalletTokenSettings = ({
    initialWalletAddress = '',
    initialTokenAmount = 0,
    initialTokenType = 'ETH',
    walletName = 'Primary Wallet',
    initialTokens = '',
}: WalletTokenSettingsProps) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [addressError, setAddressError] = useState('');
    const [tokensError, setTokensError] = useState('');
    const [confirmingChanges, setConfirmingChanges] = useState(false);
    const addressChecker = new AddressChain();

    const safeTokenAmount = initialTokenAmount !== null && initialTokenAmount !== undefined ? Number(initialTokenAmount).toString() : '0';

    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        wallet_address: initialWalletAddress || '',
        token_amount: safeTokenAmount,
        token_name: initialTokenType || 'ETH',
        tokens: initialTokens || 'tokens',
        _method: 'PUT',
    });

    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccess(true);
            setConfirmingChanges(false);

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [wasSuccessful]);

    useEffect(() => {
        if (data.wallet_address) {
            const validationResult = addressChecker.checkAddress(data.wallet_address);

            if (!validationResult.isValid) {
                setAddressError('Invalid wallet address format');
            } else if (validationResult.type !== data.token_name && (validationResult.type === 'ETH' || validationResult.type === 'SOL')) {
                setAddressError(`Address format matches ${validationResult.type}, not ${data.token_name}`);
            } else {
                setAddressError('');
            }
        } else {
            setAddressError('');
        }
        // eslint-disable-next-line
    }, [data.wallet_address, data.token_name]);

    useEffect(() => {
        if (!data.tokens || data.tokens.trim() === '') {
            setTokensError('Recovery tokens cannot be empty');
        } else {
            setTokensError('');
        }
    }, [data.tokens]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (addressError || tokensError || !isValidTokenAmount()) {
            return;
        }

        if (data.wallet_address !== initialWalletAddress && !confirmingChanges) {
            setConfirmingChanges(true);
            return;
        }

        post('/admin/settings/smartcontract');
        setConfirmingChanges(false);
    };

    const isValidTokenAmount = (): boolean => {
        const amount = parseFloat(data.token_amount);
        if (isNaN(amount) || amount < 0) {
            return false;
        }

        return amount <= 1000000000;
    };

    const hasChanges = () => {
        const currentAmount = Number(data.token_amount).toString();
        const initialAmount = Number(safeTokenAmount).toString();

        return (
            data.wallet_address !== initialWalletAddress ||
            currentAmount !== initialAmount ||
            data.token_name !== initialTokenType ||
            data.tokens !== initialTokens
        );
    };

    const handleReset = () => {
        reset();
        setAddressError('');
        setTokensError('');
        setConfirmingChanges(false);
        setData({
            wallet_address: initialWalletAddress || '',
            token_amount: safeTokenAmount,
            tokens: initialTokens || 'tokens',
            token_name: initialTokenType || 'ETH',
            _method: 'PUT',
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Wallet & Token Settings</CardTitle>
                        <CardDescription>Manage your wallet address and token balance</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
                            <Coins className="mr-1 h-4 w-4" aria-hidden="true" />
                            <span>
                                {Number(initialTokenAmount || 0).toLocaleString()} {initialTokenType}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            {showSuccess && (
                <Alert className="mx-6 border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                    <AlertDescription className="text-green-600">Wallet and token settings updated successfully!</AlertDescription>
                </Alert>
            )}

            {confirmingChanges && (
                <Alert className="mx-6 mb-4 border-amber-200 bg-amber-50">
                    <Info className="h-4 w-4 text-amber-600" aria-hidden="true" />
                    <AlertDescription className="text-amber-600">
                        You are about to change your wallet address. Please confirm this change is correct to avoid potential loss of funds.
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {/* Token Type Selection */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="token_name" className="text-base">
                                Token Type
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" aria-label="Token type information" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">The blockchain network for this token.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <Select value={data.token_name} onValueChange={(value) => setData('token_name', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select token type" />
                            </SelectTrigger>
                            <SelectContent>
                                {cryptoChains.map((chain) => (
                                    <SelectItem key={chain.value} value={chain.value}>
                                        {chain.fullName} ({chain.value})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.token_name && <p className="text-destructive mt-1 text-sm">{errors.token_name}</p>}

                        <p className="text-muted-foreground text-sm">
                            Current type:{' '}
                            {initialTokenType ? (
                                <span>
                                    {cryptoChains.find((chain) => chain.value === initialTokenType)?.fullName || initialTokenType} ({initialTokenType}
                                    )
                                </span>
                            ) : (
                                <span className="italic">No token type set</span>
                            )}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="wallet_address" className="text-base">
                                {walletName} Address
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" aria-label="Wallet address information" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">This is the blockchain address associated with your account.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Wallet className="text-muted-foreground h-5 w-5" aria-hidden="true" />
                            <Input
                                id="wallet_address"
                                value={data.wallet_address}
                                onChange={(e) => setData('wallet_address', e.target.value)}
                                placeholder={
                                    data.token_name === 'ETH' ? '0x...' : data.token_name === 'SOL' ? 'Solana address...' : 'Wallet address...'
                                }
                                className="font-mono"
                                aria-describedby="wallet-address-error"
                            />
                        </div>

                        {addressError && (
                            <p id="wallet-address-error" className="mt-1 text-sm text-amber-600">
                                {addressError}
                            </p>
                        )}
                        {errors.wallet_address && <p className="text-destructive mt-1 text-sm">{errors.wallet_address}</p>}

                        <p className="text-muted-foreground text-sm">
                            Current address:{' '}
                            {initialWalletAddress ? (
                                <span className="font-mono">{initialWalletAddress}</span>
                            ) : (
                                <span className="italic">No wallet address set</span>
                            )}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="tokens" className="text-base">
                                Recovery Tokens
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" aria-label="Recovery tokens information" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">This is where you set the tokens to be recovered</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Wallet className="text-muted-foreground h-5 w-5" aria-hidden="true" />
                            <Input
                                id="tokens"
                                value={data.tokens}
                                onChange={(e) => setData('tokens', e.target.value)}
                                placeholder="Enter recovery tokens"
                                className="font-mono"
                                aria-describedby="tokens-error"
                            />
                        </div>

                        {tokensError && (
                            <p id="tokens-error" className="mt-1 text-sm text-amber-600">
                                {tokensError}
                            </p>
                        )}
                        {errors.tokens && <p className="text-destructive mt-1 text-sm">{errors.tokens}</p>}

                        <p className="text-muted-foreground text-sm">
                            Current tokens:{' '}
                            {initialTokens ? (
                                <span className="font-mono">{initialTokens}</span>
                            ) : (
                                <span className="italic">No recovery tokens set</span>
                            )}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="token_amount" className="text-base">
                                {data.token_name} Amount
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" aria-label="Token amount information" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">The number of tokens currently assigned to this wallet.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Coins className="text-muted-foreground h-5 w-5" aria-hidden="true" />
                            <Input
                                id="token_amount"
                                type="number"
                                value={data.token_amount}
                                onChange={(e) => setData('token_amount', e.target.value)}
                                placeholder="0"
                                min="0"
                                max="1000000000"
                                step="0.0001"
                                aria-describedby="token-amount-error"
                            />
                        </div>

                        {!isValidTokenAmount() && (
                            <p id="token-amount-error" className="mt-1 text-sm text-amber-600">
                                Please enter a valid amount between 0 and 1,000,000,000
                            </p>
                        )}
                        {errors.token_amount && <p className="text-destructive mt-1 text-sm">{errors.token_amount}</p>}

                        <p className="text-muted-foreground text-sm">
                            Current amount:{' '}
                            {initialTokenAmount !== null ? (
                                <span>
                                    {Number(initialTokenAmount).toLocaleString()} {initialTokenType}
                                </span>
                            ) : (
                                <span className="italic">0 {initialTokenType}</span>
                            )}
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <div className="ml-auto flex space-x-2">
                        <Button type="button" variant="outline" onClick={handleReset} disabled={processing || !hasChanges()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing || !hasChanges() || !!addressError || !!tokensError || !isValidTokenAmount()}>
                            {processing ? 'Saving...' : confirmingChanges ? 'Confirm Changes' : 'Save Changes'}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default WalletTokenSettings;
