import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from '@inertiajs/react';
import { CheckCircle2, Coins, Info, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface WalletTokenSettingsProps {
    initialWalletAddress?: string;
    initialTokenAmount?: number | null;
    walletName?: string;
    tokenName?: string;
}

const WalletTokenSettings = ({
    initialWalletAddress = '',
    initialTokenAmount = 0,
    walletName = 'Primary Wallet',
    tokenName = 'Tokens',
}: WalletTokenSettingsProps) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const safeTokenAmount = initialTokenAmount !== null && initialTokenAmount !== undefined ? initialTokenAmount.toString() : '0';

    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        wallet_address: initialWalletAddress || '',
        token_amount: safeTokenAmount,
        _method: 'PUT',
    });

    useEffect(() => {
        if (wasSuccessful) {
            setShowSuccess(true);

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [wasSuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/smartcontract');
    };

    const hasChanges = () => {
        return data.wallet_address !== initialWalletAddress || data.token_amount !== safeTokenAmount;
    };

    const handleReset = () => {
        reset();
        setData({
            wallet_address: initialWalletAddress || '',
            token_amount: safeTokenAmount,
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
                            <Coins className="mr-1 h-4 w-4" />
                            <span>
                                {Number(initialTokenAmount || 0).toLocaleString()} {tokenName}
                            </span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            {showSuccess && (
                <Alert className="mx-6 border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">Wallet and token settings updated successfully!</AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="wallet_address" className="text-base">
                                {walletName} Address
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">This is the blockchain address associated with your account.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Wallet className="text-muted-foreground h-5 w-5" />
                            <Input
                                id="wallet_address"
                                value={data.wallet_address}
                                onChange={(e) => setData('wallet_address', e.target.value)}
                                placeholder="0x..."
                                className="font-mono"
                            />
                        </div>

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
                            <Label htmlFor="token_amount" className="text-base">
                                {tokenName} Amount
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="text-muted-foreground h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">The number of tokens currently assigned to this wallet.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Coins className="text-muted-foreground h-5 w-5" />
                            <Input
                                id="token_amount"
                                type="number"
                                value={data.token_amount}
                                onChange={(e) => setData('token_amount', e.target.value)}
                                placeholder="0"
                                min="0"
                                step="0.0001"   
                            />
                        </div>

                        {errors.token_amount && <p className="text-destructive mt-1 text-sm">{errors.token_amount}</p>}

                        <p className="text-muted-foreground text-sm">
                            Current amount:{' '}
                            {initialTokenAmount !== null ? (
                                <span>
                                    {Number(initialTokenAmount).toLocaleString()} {tokenName}
                                </span>
                            ) : (
                                <span className="italic">0 {tokenName}</span>
                            )}
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <div className="ml-auto flex space-x-2">
                        <Button type="button" variant="outline" onClick={handleReset} disabled={processing || !hasChanges()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing || !hasChanges()}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default WalletTokenSettings;
