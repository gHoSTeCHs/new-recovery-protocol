import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/pages/admin/components/layout';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Transaction {
    hash: string;
    method: string;
    block: string;
    age: string;
    from: string;
    to: string;
    amount: string;
    fee: string;
    direction?: 'IN' | 'OUT';
}

interface FormData {
    wallet_address: string;
    transactions: Transaction[];

    [key: string]: any;
}

const CreateTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        wallet_address: '',
        transactions: [],
    });

    // Sync transactions with form data whenever transactions state changes
    useEffect(() => {
        setData('transactions', transactions);
    }, [transactions, setData]);

    const addTransaction = () => {
        setTransactions([
            ...transactions,
            {
                hash: '',
                method: '',
                block: '',
                age: '',
                from: '',
                to: '',
                amount: '',
                fee: '',
            },
        ]);
    };

    const removeTransaction = (index: number) => {
        setTransactions(transactions.filter((_, i) => i !== index));
    };

    const updateTransaction = (index: number, field: keyof Transaction, value: string) => {
        const newTransactions = [...transactions];
        newTransactions[index] = { ...newTransactions[index], [field]: value };
        setTransactions(newTransactions);
    };

    const resetForm = () => {
        reset();

        setTransactions([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/transactions', {
            onSuccess: () => {
                setShowSuccess(true);

                resetForm();

                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Transactions" />
            <div className="container mx-auto py-8">
                <div className="space-y-6 px-6 py-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Wallet Transactions</h1>
                        <p className="text-muted-foreground">Add transactions for a specific wallet address</p>
                    </div>

                    {showSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-600">Transactions have been created successfully!</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Wallet Information</CardTitle>
                                <CardDescription>Enter the wallet address for the transactions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="wallet_address">Wallet Address</Label>
                                    <Input
                                        id="wallet_address"
                                        type="text"
                                        value={data.wallet_address}
                                        onChange={(e) => setData('wallet_address', e.target.value)}
                                        placeholder="0x..."
                                    />
                                    {errors.wallet_address && <p className="text-destructive text-sm">{errors.wallet_address}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Transactions</CardTitle>
                                        <CardDescription>Add and manage wallet transactions</CardDescription>
                                    </div>
                                    <Button type="button" onClick={addTransaction} className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Add Transaction
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {transactions.length === 0 ? (
                                    <p className="text-muted-foreground py-4 text-center">No transactions added. Click "Add Transaction" to start.</p>
                                ) : (
                                    transactions.map((transaction, index) => (
                                        <Card key={index} className="border-dashed">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                                <CardTitle className="text-lg">Transaction #{index + 1}</CardTitle>
                                                <Button type="button" variant="destructive" size="sm" onClick={() => removeTransaction(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`hash-${index}`}>Hash</Label>
                                                        <Input
                                                            id={`hash-${index}`}
                                                            value={transaction.hash}
                                                            onChange={(e) => updateTransaction(index, 'hash', e.target.value)}
                                                            placeholder="0x..."
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`method-${index}`}>Method</Label>
                                                        <Input
                                                            id={`method-${index}`}
                                                            value={transaction.method}
                                                            onChange={(e) => updateTransaction(index, 'method', e.target.value)}
                                                            placeholder="Transfer"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`block-${index}`}>Block</Label>
                                                        <Input
                                                            id={`block-${index}`}
                                                            value={transaction.block}
                                                            onChange={(e) => updateTransaction(index, 'block', e.target.value)}
                                                            placeholder="Block number"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`age-${index}`}>Age</Label>
                                                        <Input
                                                            id={`age-${index}`}
                                                            value={transaction.age}
                                                            onChange={(e) => updateTransaction(index, 'age', e.target.value)}
                                                            placeholder="2 mins ago"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`from-${index}`}>From</Label>
                                                        <Input
                                                            id={`from-${index}`}
                                                            value={transaction.from}
                                                            onChange={(e) => updateTransaction(index, 'from', e.target.value)}
                                                            placeholder="0x..."
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`to-${index}`}>To</Label>
                                                        <Input
                                                            id={`to-${index}`}
                                                            value={transaction.to}
                                                            onChange={(e) => updateTransaction(index, 'to', e.target.value)}
                                                            placeholder="0x..."
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`amount-${index}`}>Amount</Label>
                                                        <Input
                                                            id={`amount-${index}`}
                                                            value={transaction.amount}
                                                            onChange={(e) => updateTransaction(index, 'amount', e.target.value)}
                                                            placeholder="0.00"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`fee-${index}`}>Fee</Label>
                                                        <Input
                                                            id={`fee-${index}`}
                                                            value={transaction.fee}
                                                            onChange={(e) => updateTransaction(index, 'fee', e.target.value)}
                                                            placeholder="0.00"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`direction-${index}`}>Direction</Label>
                                                        <Select
                                                            value={transaction.direction}
                                                            onValueChange={(value) => updateTransaction(index, 'direction', value as 'IN' | 'OUT')}
                                                        >
                                                            <SelectTrigger id={`direction-${index}`}>
                                                                <SelectValue placeholder="Select direction" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="IN">IN</SelectItem>
                                                                <SelectItem value="OUT">OUT</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                                {errors.transactions && <p className="text-destructive text-sm">{errors.transactions}</p>}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={resetForm} disabled={processing}>
                                Reset
                            </Button>
                            <Button type="submit" disabled={processing || transactions.length === 0 || !data.wallet_address}>
                                {processing ? 'Creating...' : 'Create Transactions'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default CreateTransactions;
