import TransactionTable from '@/components/transactions-table';
import AppLayout from '@/layouts/app-layout';
import type { AddressTransactions, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import TransactionTableHeader from '@/components/transaction-table-header';

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
                <TransactionTableHeader address={address} />
                <TransactionTable addressTransactions={addressTransactions} />
            </div>
        </AppLayout>
    );
};

export default EthResults;
