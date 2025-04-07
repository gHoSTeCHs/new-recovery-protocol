import EthProtocolModal from '@/components/protocol_modals/eth_protocol_modal';
import { AddressTransactions } from '@/types';
import { ClipboardIcon, ExternalLinkIcon, InfoIcon, LockIcon, TagIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const TransactionTable = ({ addressTransactions }: { addressTransactions: AddressTransactions[] }) => {
    const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
    const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
    const [isProtocolModalOpen, setIsProtocolModalOpen] = useState<boolean>(false);

    const handleTransactionSelect = (hash: string) => {
        setSelectedTransactions((prev) => (prev.includes(hash) ? prev.filter((h) => h !== hash) : [...prev, hash]));
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTransactions(addressTransactions.map((tx) => tx.hash));
        } else {
            setSelectedTransactions([]);
        }
    };

    const handleAddressHover = (address: string) => {
        setHoveredAddress(address);
    };

    const handleAddressLeave = () => {
        setHoveredAddress(null);
    };

    const renderAddressCell = (address: string, isFrom: boolean, direction?: 'IN' | 'OUT') => {
        const shouldAddBorder = hoveredAddress === address;

        return (
            <div className="flex items-center">
                {isFrom && (
                    <span className="mr-2">
                        <LockIcon className="h-4 w-4 text-gray-400" />
                    </span>
                )}
                <div
                    className={`flex items-center ${shouldAddBorder ? 'rounded border-2 border-dotted border-red-500' : ''}`}
                    onMouseEnter={() => handleAddressHover(address)}
                    onMouseLeave={handleAddressLeave}
                >
                    {address.includes('0x') ? (
                        <span className="cursor-pointer text-blue-500 hover:text-blue-700">{address}</span>
                    ) : (
                        <div className="flex items-center">
                            <span className="mr-2">
                                <ClipboardIcon className="h-4 w-4 text-gray-400" />
                            </span>
                            <span className="cursor-pointer text-blue-500 hover:text-blue-700">{address}</span>
                        </div>
                    )}

                    {!isFrom && direction && (
                        <span
                            className={`ml-2 rounded px-1.5 py-0.5 text-xs ${
                                direction === 'IN' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}
                        >
                            {direction}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-md p-4">
            <div className="m-auto max-w-[1200px] bg-gray-900 p-4 text-white">
                <div className="mb-4 flex items-center justify-between">
                    <button className="rounded-md bg-blue-500 px-4 py-1 text-white">Token Transfers (ERC-20)</button>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-300">
                            {selectedTransactions.length > 0 ? `${selectedTransactions.length} transactions selected` : ''}
                        </span>
                        {selectedTransactions.length > 0 && (
                            <Button variant="outline" size="sm" onClick={() => setSelectedTransactions([])} className="text-xs">
                                Clear Selection
                            </Button>
                        )}
                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <div className="flex items-center">
                        <TagIcon className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Latest {addressTransactions.length} from most recent transactions</span>
                    </div>
                    <div className="ml-auto flex items-center"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="select-all"
                                            onCheckedChange={(checked) => handleSelectAll(checked === true)}
                                            checked={selectedTransactions.length === addressTransactions.length && addressTransactions.length > 0}
                                            aria-label="Select all transactions"
                                            className="mr-2"
                                        />
                                        <InfoIcon className="mr-2 h-5 w-5" />
                                        Transaction Hash
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                    <div className="flex items-center">
                                        Method
                                        <InfoIcon className="ml-1 h-5 w-5" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Block</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Age</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">From</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">To</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Amount</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Txn Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addressTransactions.map((transaction, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-800 hover:bg-gray-800 ${
                                        selectedTransactions.includes(transaction.hash) ? 'bg-gray-700' : ''
                                    }`}
                                    onClick={() => handleTransactionSelect(transaction.hash)}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id={transaction.hash}
                                                checked={selectedTransactions.includes(transaction.hash)}
                                                onCheckedChange={() => handleTransactionSelect(transaction.hash)}
                                                aria-label={`Select transaction ${transaction.hash}`}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="ml-2 cursor-pointer text-blue-500 hover:text-blue-700">{transaction.hash}</span>
                                            <button className="ml-2" title="Copy transaction hash" onClick={(e) => e.stopPropagation()}>
                                                <ExternalLinkIcon className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="rounded-full bg-gray-700 px-3 py-1 text-xs text-white">{transaction.method}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="cursor-pointer text-blue-500 hover:text-blue-700">{transaction.block}</span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">{transaction.age}</td>
                                    <td className="px-4 py-3">{renderAddressCell(transaction.from, true)}</td>
                                    <td className="px-4 py-3">{renderAddressCell(transaction.to, false, transaction.direction)}</td>
                                    <td className="px-4 py-3 text-right text-gray-300">{transaction.amount}</td>
                                    <td className="px-4 py-3 text-right text-gray-300">{transaction.fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm">
                    {selectedTransactions.length > 0 && (
                        <span>
                            {selectedTransactions.length} transaction{selectedTransactions.length !== 1 ? 's' : ''} selected
                        </span>
                    )}
                </div>
                <Button
                    disabled={selectedTransactions.length === 0}
                    onClick={() => setIsProtocolModalOpen(true)}
                    className="rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-25"
                >
                    Initiate reverse smart contract for {selectedTransactions.length} transaction{selectedTransactions.length !== 1 ? 's' : ''}
                </Button>
            </div>
            <EthProtocolModal
                isProtocolModalOpen={isProtocolModalOpen}
                selectedTransactions={selectedTransactions}
                recoveryDetails={null}
                setIsProtocolModalOpen={setIsProtocolModalOpen}
            />
        </div>
    );
};

export default TransactionTable;
