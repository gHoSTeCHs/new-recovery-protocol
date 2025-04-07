import { Button } from '@/components/ui/button';
import { images } from '@/constants';
import AddressChain from '@/helpers/walletAddressChain';
import { ChevronDown, Copy } from 'lucide-react';

const TransactionTableHeader = ({ address }: { address: string }) => {
    const addressChecker = new AddressChain();

    const validationResult = addressChecker.checkAddress(address);

    const logoSrc = validationResult.type === 'ETH' ? images.ethLogo : validationResult.type === 'SOL' ? images.solLogo : images.unknownLogo;

    const chainName = validationResult.type === 'ETH' ? 'ETH' : validationResult.type === 'SOL' ? 'SOL' : 'Unknown';

    const accountType = validationResult.type === 'ETH' ? 'Contract Account' : validationResult.type === 'SOL' ? 'Wallet Account' : 'Unknown Account';

    const formatAddress = (addr: string) => {
        if (!addr || addr.length < 10) return addr;
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center rounded-md bg-gray-800 p-4">
                <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <img src={logoSrc} alt={`${chainName} Logo`} className="h-10 w-10" />
                </div>

                <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                        <h1 className="text-xl font-bold">{chainName}</h1>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">{accountType}</span>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs text-gray-400">i</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm">{formatAddress(address)}</span>
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
    );
};

export default TransactionTableHeader;
