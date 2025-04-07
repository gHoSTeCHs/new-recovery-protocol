import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { AlertTriangle, Calendar, ChevronDown, ChevronRight, ChevronUp, Flame, Info, Lock, Search, Star, StarOff, User } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

declare global {
    interface Window {
        searchTimeout: ReturnType<typeof setTimeout> | undefined;
    }
}

interface SearchResult {
    address: string;
    network: string;
    riskScore?: number;
    lastActivity?: string;
}

interface FavoriteItem {
    address: string;
    note: string;
    network: string;
    dateAdded: string;
}

interface Investigation {
    id: string;
    name: string;
    createdAt: string;
    owner: string;
    status: 'active' | 'archived' | 'completed';
}

export default function Dashboard() {
    const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState<boolean>(false);
    const [selectedToken, setSelectedToken] = useState<string>('Token');
    const [selectedNetwork, setSelectedNetwork] = useState<string>('');

    const [address, setAddress] = useState<string>('');
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [investigations, setInvestigations] = useState<Investigation[]>([]);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
    const [isLoadingInvestigations, setIsLoadingInvestigations] = useState(true);

    const networkTokens = {
        ETH: [
            { symbol: 'ETH', icon: '◯', color: 'text-white' },
            {
                symbol: 'USDT',
                icon: '♦',
                color: 'text-green-400',
            },
        ],
        BSC: [
            { symbol: 'BNB', icon: '●', color: 'text-yellow-500' },
            {
                symbol: 'USDT',
                icon: '●',
                color: 'text-yellow-500',
            },
        ],
        TRON: [
            { symbol: 'TRX', icon: '⬡', color: 'text-red-500' },
            {
                symbol: 'USDT',
                icon: '■',
                color: 'text-red-500',
            },
        ],
        Polygon: [{ symbol: 'POL', icon: '⬠', color: 'text-purple-500' }],
        BTC: [{ symbol: 'BTC', icon: '●', color: 'text-yellow-500' }],
        Arbitrum: [{ symbol: 'ARB', icon: '◉', color: 'text-blue-500' }],
        Solana: [{ symbol: 'SOL', icon: '≡', color: 'text-green-500' }],
    };

    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoadingFavorites(true);
            try {
                // const response = await axios.get('/api/favorites');
                // setFavorites(response.data);

                setTimeout(() => {
                    setFavorites([
                        {
                            address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
                            note: 'Personal wallet',
                            network: 'ETH',
                            dateAdded: '2025-03-15',
                        },
                        {
                            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                            note: 'USDT Contract',
                            network: 'ETH',
                            dateAdded: '2025-03-20',
                        },
                    ]);
                    setIsLoadingFavorites(false);
                }, 800);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
                setIsLoadingFavorites(false);
            }
        };

        const loadInvestigations = async () => {
            setIsLoadingInvestigations(true);
            try {
                // const response = await axios.get('/api/investigations');
                // setInvestigations(response.data);

                setTimeout(() => {
                    setInvestigations([
                        {
                            id: 'INV-2025-001',
                            name: 'SonneFinance Exploit Analysis',
                            createdAt: '2025-04-01T14:30:00Z',
                            owner: 'Alex Chen',
                            status: 'active',
                        },
                        {
                            id: 'INV-2025-002',
                            name: 'Suspicious BTC Transfers',
                            createdAt: '2025-03-28T09:15:00Z',
                            owner: 'Sarah Johnson',
                            status: 'active',
                        },
                    ]);
                    setIsLoadingInvestigations(false);
                }, 1000);
            } catch (error) {
                console.error('Failed to fetch investigations:', error);
                setIsLoadingInvestigations(false);
            }
        };

        loadFavorites().then();
        loadInvestigations().then();
    }, []);

    const handleSearch = useCallback(async () => {
        if (!address) {
            setSearchResult([]);
            setSearchError(null);
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
            const response = await axios.get(`/api/walletresults/${encodeURIComponent(address)}`);

            console.log(response);
            setSearchResult(
                response.data.addressResults.map((item: { wallet_address: any }) => ({
                    address: item.wallet_address,
                    network: selectedNetwork || 'ETH',
                })),
            );
            setIsSearching(false);
        } catch (e: unknown) {
            console.error(e);
            setSearchError('Error fetching results. Please try again.');
            setIsSearching(false);
        }
    }, [address, selectedNetwork]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        setSearchError(null);

        if (window.searchTimeout) {
            clearTimeout(window.searchTimeout);
        }

        window.searchTimeout = setTimeout(() => {
            if (newAddress) {
                handleSearch().then();
            } else {
                setSearchResult([]);
            }
        }, 500);
    };

    const toggleFavorite = (result: SearchResult) => {
        const existingIndex = favorites.findIndex((fav) => fav.address === result.address);

        if (existingIndex >= 0) {
            setFavorites(favorites.filter((_, index) => index !== existingIndex));
        } else {
            setFavorites([
                ...favorites,
                {
                    address: result.address,
                    note: '',
                    network: result.network,
                    dateAdded: new Date().toISOString().split('T')[0],
                },
            ]);
        }
    };

    const isAddressFavorited = (address: string) => {
        return favorites.some((fav) => fav.address === address);
    };

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    const getRiskColor = (score: number) => {
        if (score < 30) return 'bg-green-500';
        if (score < 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="py-8 text-center">
                    <h1 className="text-2xl font-medium text-gray-300">Risk Analysis, Intelligent Tracking</h1>
                    <p className="mt-2 text-gray-400">Track and analyze blockchain addresses across multiple networks</p>
                </div>

                {/* Enhanced Search Bar */}
                <div className="relative m-auto flex w-full max-w-3xl flex-col space-y-2 px-6">
                    <div className="flex shadow-lg">
                        <div
                            className="relative flex w-48 cursor-pointer items-center rounded-l-md bg-zinc-800 px-4 py-3"
                            onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                        >
                            <div className="mr-2 text-gray-400">
                                <Search className="h-5 w-5" />
                            </div>
                            <span className="flex-1 text-gray-300">{selectedToken}</span>
                            {isTokenDropdownOpen ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                        </div>
                        <Input
                            className="h-12 flex-1 rounded-none border-0 bg-zinc-800 text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Search by Address / ENS / Txn Hash"
                            id={'walletAddress'}
                            type={'text'}
                            value={address}
                            onChange={handleInputChange}
                            aria-label="Wallet Address Search"
                        />
                        <Button className="h-12 rounded-r-md bg-red-500 px-6 py-3 hover:bg-red-600" onClick={handleSearch}>
                            <Search className="mr-2 h-5 w-5" />
                            Search
                        </Button>
                    </div>

                    {searchError && (
                        <div className="flex items-center text-red-500">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            {searchError}
                        </div>
                    )}

                    {isSearching && (
                        <div className="mt-2 flex items-center text-gray-500">
                            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Searching...
                        </div>
                    )}

                    {!isSearching && searchResult.length === 0 && address && !searchError && (
                        <div className="mt-2 flex items-center text-red-500">
                            <Info className="mr-2 h-4 w-4" />
                            No matching addresses found
                        </div>
                    )}

                    {searchResult.length > 0 && (
                        <Card className="mt-4 border-zinc-700 bg-zinc-800">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-medium text-gray-300">Search Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {searchResult.map((result, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded border border-zinc-700 bg-zinc-900 p-3 transition-colors hover:bg-zinc-800"
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <Badge className="mr-2 bg-zinc-700">{result.network}</Badge>
                                                    <Link href={`/eth-results/${result.address}`}>
                                                        <span className="cursor-pointer font-mono text-sm text-blue-400 hover:text-blue-300 hover:underline">
                                                            {result.address}
                                                        </span>
                                                    </Link>
                                                </div>
                                                {result.lastActivity && (
                                                    <div className="mt-1 flex items-center text-xs text-gray-400">
                                                        <Calendar className="mr-1 h-3 w-3" />
                                                        Last activity: {formatDateTime(result.lastActivity)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                {result.riskScore !== undefined && (
                                                    <Tooltip>
                                                        <TooltipTrigger>{`Risk Score: ${result.riskScore}/100`}</TooltipTrigger>
                                                        <TooltipContent>
                                                            <div className="flex items-center">
                                                                <div className="mr-2 text-sm text-gray-400">Risk:</div>
                                                                <div
                                                                    className={`h-6 w-6 rounded-full ${getRiskColor(result.riskScore)} flex items-center justify-center text-xs font-bold text-white`}
                                                                >
                                                                    {result.riskScore}
                                                                </div>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleFavorite(result)}
                                                    title={isAddressFavorited(result.address) ? 'Remove from favorites' : 'Add to favorites'}
                                                >
                                                    {isAddressFavorited(result.address) ? (
                                                        <Star className="h-5 w-5 text-yellow-500" />
                                                    ) : (
                                                        <StarOff className="h-5 w-5 text-gray-400" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Token Dropdown */}
                    {isTokenDropdownOpen && (
                        <div className="absolute top-14 left-0 z-10 max-h-80 w-64 overflow-y-auto rounded-md border border-zinc-800 bg-zinc-900 shadow-lg">
                            <div className="p-2">
                                <Input className="border-0 bg-zinc-800 text-gray-300" placeholder="Filter networks..." />
                            </div>

                            <div className="border-b border-zinc-800 py-2">
                                <div className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-zinc-800">
                                    <div className="flex items-center">
                                        <Flame className="mr-2 h-5 w-5 text-red-500" />
                                        <span>Hot Tokens</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
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
                                        className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-zinc-800"
                                        onClick={() => {
                                            setSelectedToken(token.symbol);
                                            setSelectedNetwork(token.network);
                                            setIsTokenDropdownOpen(false);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <span className={`mr-2 ${token.color}`}>{token.icon}</span>
                                            <span>{token.symbol}</span>
                                        </div>
                                        {token.symbol === 'Solana' ? (
                                            <Lock className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Token Dropdown Details */}
                    {isTokenDropdownOpen && selectedNetwork && networkTokens[selectedNetwork] && (
                        <div className="absolute top-14 right-0 left-64 z-10 mx-6 max-h-80 overflow-y-auto rounded-md border border-zinc-800 bg-zinc-900 shadow-lg">
                            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                                {networkTokens[selectedNetwork].map((token, index) => (
                                    <div
                                        key={index}
                                        className="flex cursor-pointer items-center space-x-3 rounded border border-transparent p-2 hover:border-zinc-700 hover:bg-zinc-800"
                                        onClick={() => {
                                            setSelectedToken(`${token.symbol} (${selectedNetwork})`);
                                            setIsTokenDropdownOpen(false);
                                        }}
                                    >
                                        <span className={`${token.color} text-xl`}>{token.icon}</span>
                                        <span className="flex-1">{token.symbol}</span>
                                        <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-gray-300">{selectedNetwork}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Hot Event */}
                <div className="px-6">
                    <div className="bg-opacity-50 mt-6 animate-pulse rounded-md bg-zinc-800 px-6 py-4 text-center">
                        <span className="text-gray-400">
                            <Flame className="mr-2 inline h-5 w-5 text-red-500" />
                            Recent Hot Event:
                            <Link href={'/case/sonnefinance'}>
                                <span className="ml-2 cursor-pointer text-gray-300 hover:text-red-400 hover:underline">
                                    SonneFinance Exploiter (0x5D0...80BBb)
                                </span>
                            </Link>
                        </span>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="mt-6 grid flex-1 grid-cols-1 gap-6 px-6 py-4 md:grid-cols-2">
                    {/* Favorites Panel */}
                    <Card className="border-zinc-700 bg-zinc-800">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="mr-2 h-4 border-l-4 border-red-500"></span>
                                    <CardTitle className="text-lg font-medium">Favorites</CardTitle>
                                </div>
                                <Link href={'/favorites'}>
                                    <div className="flex cursor-pointer items-center text-gray-400 hover:text-gray-300">
                                        <span className="mr-1">More</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoadingFavorites ? (
                                <div className="space-y-3 py-2">
                                    <Skeleton className="h-12 w-full bg-zinc-700" />
                                    <Skeleton className="h-12 w-full bg-zinc-700" />
                                </div>
                            ) : favorites.length > 0 ? (
                                <div>
                                    <div className="mb-2 grid grid-cols-12 gap-2 text-sm text-gray-400">
                                        <div className="col-span-2">Network</div>
                                        <div className="col-span-6">Wallet Address</div>
                                        <div className="col-span-4">Note</div>
                                    </div>
                                    <div className="space-y-2">
                                        {favorites.map((item, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-12 items-center gap-2 rounded border border-zinc-700 bg-zinc-900 p-2 text-sm"
                                            >
                                                <div className="col-span-2">
                                                    <Badge variant="outline" className="border-zinc-600">
                                                        {item.network}
                                                    </Badge>
                                                </div>
                                                <div className="col-span-6">
                                                    <Link href={`/${item.network.toLowerCase()}/${item.address}`}>
                                                        <span className="cursor-pointer font-mono text-blue-400 hover:text-blue-300 hover:underline">
                                                            {truncateAddress(item.address)}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-span-3 text-gray-300">{item.note}</div>
                                                <div className="col-span-1 flex justify-end">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => {
                                                            setFavorites(favorites.filter((_, i) => i !== index));
                                                        }}
                                                    >
                                                        <StarOff className="h-4 w-4 text-gray-400 hover:text-red-400" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col items-center justify-center py-8">
                                    <div className="mb-4 text-gray-600">
                                        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <circle cx="35" cy="40" r="5" fill="currentColor" />
                                            <circle cx="65" cy="40" r="5" fill="currentColor" />
                                            <path d="M30 65 Q50 80 70 65" stroke="currentColor" strokeWidth="4" fill="none" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-600">No favorites yet</div>
                                    <Button variant="outline" className="mt-4 border-zinc-600 text-gray-400 hover:bg-zinc-700 hover:text-gray-300">
                                        <Star className="mr-2 h-4 w-4" />
                                        Add your first favorite
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Investigations Panel */}
                    <Card className="border-zinc-700 bg-zinc-800">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="mr-2 h-4 border-l-4 border-red-500"></span>
                                    <CardTitle className="text-lg font-medium">Investigations</CardTitle>
                                </div>
                                <Link href={'/investigations'}>
                                    <div className="flex cursor-pointer items-center text-gray-400 hover:text-gray-300">
                                        <span className="mr-1">More</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoadingInvestigations ? (
                                <div className="space-y-3 py-2">
                                    <Skeleton className="h-12 w-full bg-zinc-700" />
                                    <Skeleton className="h-12 w-full bg-zinc-700" />
                                </div>
                            ) : investigations.length > 0 ? (
                                <div>
                                    <div className="mb-2 grid grid-cols-12 gap-2 text-sm text-gray-400">
                                        <div className="col-span-4">Case Name</div>
                                        <div className="col-span-4">Created At (UTC)</div>
                                        <div className="col-span-3">Owner</div>
                                        <div className="col-span-1">Status</div>
                                    </div>
                                    <div className="space-y-2">
                                        {investigations.map((item, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-12 items-center gap-2 rounded border border-zinc-700 bg-zinc-900 p-2 text-sm"
                                            >
                                                <div className="col-span-4">
                                                    <Link href={`/investigations/${item.id}`}>
                                                        <span className="cursor-pointer font-medium text-blue-400 hover:text-blue-300 hover:underline">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-span-4 text-gray-300">{formatDateTime(item.createdAt)}</div>
                                                <div className="col-span-3 flex items-center">
                                                    <User className="mr-1 h-4 w-4 text-gray-400" />
                                                    <span className="text-gray-300">{item.owner}</span>
                                                </div>
                                                <div className="col-span-1">
                                                    <Badge className="bg-green-600">Active</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col items-center justify-center py-8">
                                    <div className="mb-4 text-gray-600">
                                        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path d="M30 50 Q50 70 70 50" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <circle cx="35" cy="40" r="5" fill="currentColor" />
                                            <circle cx="65" cy="40" r="5" fill="currentColor" />
                                        </svg>
                                    </div>
                                    <div className="text-gray-600">No investigations yet</div>
                                    <Button variant="outline" className="mt-4 border-zinc-600 text-gray-400 hover:bg-zinc-700 hover:text-gray-300">
                                        <Lock className="mr-2 h-4 w-4" />
                                        Start a new investigation
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
