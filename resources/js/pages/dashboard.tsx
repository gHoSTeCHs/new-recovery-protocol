import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    Search,
    ChevronUp,
    Flame,
    ChevronRight,
    Lock,
} from 'lucide-react';
import React, { useState } from 'react';
// import TopNavigation from '@/components/top-navigation';
import { Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState<boolean>(false);
    const [selectedToken, setSelectedToken] = useState<string>('Token');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                {/*<TopNavigation />*/}

                <div className="py-8 text-center">
                    <h1 className="text-2xl font-medium text-gray-300">
                        Risk Analysis, Intelligent Tracking
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="px-6 flex space-x-2 relative m-auto">
                    <div className=" flex">
                        <div
                            className="w-48 bg-zinc-800 rounded-l-md flex items-center px-4 cursor-pointer relative"
                            onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}>
                            <div className="text-gray-400 mr-2">
                                <Search className="w-5 h-5" />
                            </div>
                            <span className="text-gray-300 flex-1">{selectedToken}</span>
                            {isTokenDropdownOpen ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                        </div>
                        <Input
                            className="flex-1 bg-zinc-800 border-0 rounded-none rounded-r-md text-gray-300 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Search by Address / ENS / Txn Hash"
                        />
                    </div>
                    <Button className="bg-red-500 hover:bg-red-600 rounded-md px-6 py-3 h-12">
                        <Search className="w-5 h-5 mr-2" />
                        Search
                    </Button>

                    {/* Token Dropdown */}
                    {isTokenDropdownOpen && (
                        <div
                            className="absolute top-14 left-0 w-64 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
                            <div className="p-2">
                                <Input
                                    className="bg-zinc-800 border-0 text-gray-300"
                                    placeholder="Search"
                                />
                            </div>

                            <div className="py-2 border-b border-zinc-800">
                                <div
                                    className="px-4 py-2 flex items-center justify-between hover:bg-zinc-800 cursor-pointer">
                                    <div className="flex items-center">
                                        <Flame className="w-5 h-5 text-red-500 mr-2" />
                                        <span>Hot Tokens</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <div className="py-2">
                                {[
                                    {
                                        symbol: 'ETH',
                                        icon: '◯',
                                        color: 'text-white',
                                        network: 'ETH',
                                    },
                                    {
                                        symbol: 'BSC',
                                        icon: '●',
                                        color: 'text-yellow-500',
                                        network: 'BSC',
                                    },
                                    {
                                        symbol: 'TRON',
                                        icon: '⬡',
                                        color: 'text-red-500',
                                        network: 'TRON',
                                    },
                                    {
                                        symbol: 'Polygon',
                                        icon: '⬠',
                                        color: 'text-purple-500',
                                        network: 'Polygon',
                                    },
                                    {
                                        symbol: 'UTXO Chain',
                                        icon: '●',
                                        color: 'text-orange-500',
                                        network: '',
                                    },
                                    {
                                        symbol: 'Arbitrum',
                                        icon: '◉',
                                        color: 'text-blue-500',
                                        network: '',
                                    },
                                    {
                                        symbol: 'Solana',
                                        icon: '≡',
                                        color: 'text-green-500',
                                        network: '',
                                    },
                                ].map((token, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 flex items-center justify-between hover:bg-zinc-800 cursor-pointer"
                                        onClick={() => {
                                            setSelectedToken(token.symbol);
                                            setIsTokenDropdownOpen(false);
                                        }}>
                                        <div className="flex items-center">
                                            <span className={`mr-2 ${token.color}`}>{token.icon}</span>
                                            <span>{token.symbol}</span>
                                        </div>
                                        {token.symbol === 'Solana' ? (
                                            <Lock className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Token Dropdown Details (from second image) */}
                    {isTokenDropdownOpen && (
                        <div
                            className="absolute top-14 left-64 right-0 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto mx-6">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                {[
                                    {
                                        symbol: 'USDT',
                                        icon: '■',
                                        color: 'text-red-500',
                                        network: 'TRON',
                                    },
                                    {
                                        symbol: 'ETH',
                                        icon: '◯',
                                        color: 'text-white',
                                        network: 'ETH',
                                    },
                                    {
                                        symbol: 'BTC',
                                        icon: '●',
                                        color: 'text-yellow-500',
                                        network: 'BTC',
                                    },
                                    {
                                        symbol: 'USDT',
                                        icon: '●',
                                        color: 'text-yellow-500',
                                        network: 'BSC',
                                    },
                                    {
                                        symbol: 'USDT',
                                        icon: '♦',
                                        color: 'text-green-400',
                                        network: 'ETH',
                                    },
                                    {
                                        symbol: 'BNB',
                                        icon: '●',
                                        color: 'text-yellow-500',
                                        network: 'BSC',
                                    },
                                    {
                                        symbol: 'TRX',
                                        icon: '⬡',
                                        color: 'text-red-500',
                                        network: 'TRON',
                                    },
                                    {
                                        symbol: 'POL',
                                        icon: '⬠',
                                        color: 'text-purple-500',
                                        network: 'Polygon',
                                    },
                                ].map((token, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 cursor-pointer"
                                        onClick={() => {
                                            setSelectedToken(token.symbol);
                                            setIsTokenDropdownOpen(false);
                                        }}>
                                        <span className={`${token.color} text-xl`}>{token.icon}</span>
                                        <span className="flex-1">{token.symbol}</span>
                                        <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-gray-300">
										{token.network}
									</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Hot Event */}
                <div className="px-6 py-4 text-center">
				<span className="text-gray-400">
					<Flame className="w-5 h-5 text-red-500 inline mr-2" />
					Recent Hot Event:
					<span className="ml-2 text-gray-300">
						SonneFinance Exploiter (0x5D0...80BBb)
					</span>
				</span>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 px-6 py-4 grid grid-cols-2 gap-6">
                    {/* Favorites Panel */}
                    <div className="bg-zinc-800 rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <span className="border-l-4 border-red-500 h-4 mr-2"></span>
                                <span className="text-lg font-medium">Favorites</span>
                            </div>
                            <div className="flex items-center text-gray-400 cursor-pointer">
                                <span className="mr-1">More</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-gray-400 text-sm">Wallet Address</div>
                                <div className="text-gray-400 text-sm">Note</div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center py-8">
                            <div className="text-gray-600 mb-4">
                                <svg
                                    width="64"
                                    height="64"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <circle cx="35" cy="40" r="5" fill="currentColor" />
                                    <circle cx="65" cy="40" r="5" fill="currentColor" />
                                    <path
                                        d="M30 65 Q50 80 70 65"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <div className="text-gray-600">No data</div>
                        </div>
                    </div>

                    {/* Investigations Panel */}
                    <div className="bg-zinc-800 rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <span className="border-l-4 border-red-500 h-4 mr-2"></span>
                                <span className="text-lg font-medium">Investigations</span>
                            </div>
                            <div className="flex items-center text-gray-400 cursor-pointer">
                                <span className="mr-1">More</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-gray-400 text-sm">Case Name</div>
                                <div className="text-gray-400 text-sm">Created At (UTC)</div>
                                <div className="text-gray-400 text-sm">Owner</div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center py-8">
                            <div className="text-gray-600 mb-4">
                                <svg
                                    width="64"
                                    height="64"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <circle cx="35" cy="40" r="5" fill="currentColor" />
                                    <circle cx="65" cy="40" r="5" fill="currentColor" />
                                    <path
                                        d="M30 65 Q50 80 70 65"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <div className="text-gray-600">No data</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
