import TransactionTable from '@/components/transactions-table';
import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import AppLayout from '@/layouts/app-layout';
import type { AddressTransactions, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronDown, Copy } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eth results',
        href: '/eth-results',
    },
];

const EthResults = ({ address, addressTransactions }: { address: string; addressTransactions: AddressTransactions[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Wallet Results'} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="p-6">
                    <div className="mb-6 flex items-center rounded-md bg-gray-800 p-4">
                        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                            <img src={images.ethLogo} alt="Ethereum Logo" className="h-10 w-10" />
                        </div>

                        <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                                <h1 className="text-xl font-bold">ETH</h1>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-400">Contract Account</span>
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs text-gray-400">i</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm">{address}</span>
                                <Button variant="ghost" size="sm" className="h-auto p-1">
                                    <Copy className="h-4 w-4 text-gray-400" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-auto p-1">
                                    <span className="text-xs text-gray-400">Report</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-auto p-1">
                                    <span className="text-xs text-gray-400">⭐ Favorites</span>
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" className="border-gray-700 text-gray-300">
                                Portfolio <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="border-gray-700 text-gray-300">
                                Explorer <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <TransactionTable addressTransactions={addressTransactions} />
            </div>
        </AppLayout>
    );
};

export default EthResults;
