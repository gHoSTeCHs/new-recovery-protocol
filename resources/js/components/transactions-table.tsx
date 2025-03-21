import EthProtocolModal from '@/components/protocol_modals/eth_protocol_modal';
import { transactions } from '@/data';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

const TransactionTable: React.FC = () => {
    const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
    const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
    const [isProtocolModalOpen, setIsProtocolModalOpen] = useState<boolean>(false);

    // Sample data based on the screenshot

    const handleTransactionSelect = (hash: string) => {
        setSelectedTransactions((prev) => (prev.includes(hash) ? prev.filter((h) => h !== hash) : [...prev, hash]));
    };

    const handleAddressHover = (address: string) => {
        setHoveredAddress(address);
    };

    const handleAddressLeave = () => {
        setHoveredAddress(null);
    };

    const renderAddressCell = (address: string, isFrom: boolean, direction?: 'IN' | 'OUT') => {
        // const isHighlighted = hoveredAddress === address;
        const shouldAddBorder = hoveredAddress && hoveredAddress === address;

        return (
            <div className="flex items-center">
                {isFrom && (
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
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
                <div className="mb-4 flex items-center space-x-4">
                    <button className="rounded-md bg-blue-500 px-4 py-1 text-white">Token Transfers (ERC-20)</button>
                </div>

                <div className="mb-4 flex items-center">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-xs text-gray-400">Latest 22 from a total of 22 transactions</span>
                    </div>
                    <div className="ml-auto flex items-center"></div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Transaction Hash
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                    <div className="flex items-center">
                                        Method
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
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
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center">
                                            <Checkbox id={transaction.hash} onCheckedChange={() => handleTransactionSelect(transaction.hash)} />
                                            <span className="cursor-pointer text-blue-500 hover:text-blue-700">{transaction.hash}</span>
                                            <button className="ml-2" title="button">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-400"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                                </svg>
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
            <div className="mt-6 flex justify-end">
                <Button
                    disabled={selectedTransactions?.length === 0}
                    onClick={() => setIsProtocolModalOpen(true)}
                    className="rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-25"
                >
                    Initiate reverse smart contract
                </Button>
            </div>
            <EthProtocolModal
                isProtocolModalOpen={isProtocolModalOpen}
                selectedTransactions={null}
                recoveryDetails={null}
                setIsProtocolModalOpen={setIsProtocolModalOpen}
            />
        </div>
    );
};

export default TransactionTable;
