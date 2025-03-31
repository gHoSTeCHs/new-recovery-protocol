import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';
import { recoveryStages } from '@/data';
import { RecoveryDetailsType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, CircleAlert, Cpu, Wallet, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type MessageType = 'error' | 'success';

const ErrorRecoverySimulator = ({ messageType }: { messageType: MessageType }) => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorStage, setErrorStage] = useState('');
    const [recoveryDetails, setRecoveryDetails] = useState({
        walletType: '',
        estimatedRecoveryTime: 0,
        detectedFragments: 0,
        cryptoTypes: [] as string[],
    });
    const [solRecoveryDetails, setSolRecoveryDetails] = useState<RecoveryDetailsType | null>(null);

    const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(true);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
    const [recoveredAmount, setRecoveredAmount] = useState<string>('');

    const generateNonLinearProgress = () => {
        return Math.pow(Math.random(), 2) * 100;
    };

    const startRecovery = () => {
        const cryptoTypes = ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Polkadot']
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 3) + 1);

        const walletTypes = ['Hardware Wallet', 'Software Wallet', 'Paper Wallet', 'Cold Storage'];

        setRecoveryDetails({
            walletType: walletTypes[Math.floor(Math.random() * walletTypes.length)],
            estimatedRecoveryTime: Math.floor(Math.random() * 45) + 120,
            detectedFragments: Math.floor(Math.random() * 15) + 5,
            cryptoTypes: cryptoTypes,
        });

        // Generate a random recovered amount between 0.5 and 10 ETH with 4 decimal places
        setRecoveredAmount((Math.random() * 9.5 + 0.5).toFixed(4));

        setProgress(0);
        setIsRunning(true);
        setIsError(false);
        setIsSuccess(false);
        setErrorStage('');

        const errorPoint = Math.random() * (0.93 - 0.77) + 0.77;

        const totalDuration = Math.random() * 60000 + 120000;
        const intervalDuration = totalDuration / 100;

        let currentProgress = 0;

        const progressInterval = setInterval(() => {
            currentProgress += generateNonLinearProgress() / 10;

            currentProgress = Math.min(currentProgress, 100);
            setProgress(currentProgress);

            // For error message type, potentially trigger an error
            if (messageType === 'error' && currentProgress >= errorPoint * 100 && Math.random() < 0.5) {
                clearInterval(progressInterval);
                setIsRunning(false);
                setIsError(true);
                setErrorStage(recoveryStages[Math.floor(Math.random() * recoveryStages.length)].name);
                return;
            }

            // Complete recovery
            if (currentProgress >= 100) {
                clearInterval(progressInterval);
                setIsRunning(false);

                // Show success modal only if messageType is 'success'
                if (messageType === 'success') {
                    setIsSuccess(true);
                } else {
                    setIsError(true);
                    setErrorStage(recoveryStages[Math.floor(Math.random() * recoveryStages.length)].name);
                }
            }
        }, intervalDuration);
    };

    const resetRecovery = () => {
        setIsError(false);
        setIsSuccess(false);
        setProgress(0);
    };

    const currentStage = useMemo(() => {
        const stageIndex = Math.floor(progress / (100 / recoveryStages.length));
        return recoveryStages[Math.min(stageIndex, recoveryStages.length - 1)];
    }, [progress]);

    const { data, setData } = useForm({
        walletAddress: '',
    });

    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    useEffect(() => {
        setSolRecoveryDetails({
            id: 1,
            created_at: '234',
            detected_tokens: 'Cardano, DogCoin, TrumpCoin, Melina',
            gasFee: '930945',
            gasFee_address: 'iwper',
            updated_at: 'werwer',
            wallet_type: 'phantom',
        });
    }, []);

    return (
        <div className="from-background/60 to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
            <Head title="Recovery Page" />
            <div className="bg-card w-full max-w-xl overflow-hidden rounded-xl shadow-2xl">
                <div className="text-primary-foreground bg-blue-800 p-6">
                    <h2 className="text-center text-2xl font-bold">Initiating Reverse Smart Contract Protocol...</h2>
                </div>

                <div className="p-6">
                    {/* Detailed Progress Bar */}
                    <div className="bg-muted mb-4 h-4 w-full overflow-hidden rounded-full">
                        <div
                            className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${progress}%`,
                                backgroundImage:
                                    'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                            }}
                        ></div>
                    </div>

                    {/* Recovery Information */}
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Progress:</span>
                            <span>{progress.toFixed(4)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Current Stage:</span>
                            <span className="flex items-center">
                                {currentStage && (
                                    <>
                                        {currentStage.icon && <currentStage.icon className="mr-2" size={16} />}
                                        {currentStage.name}
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Destination Address</span>
                            <span>{truncateAddress(data.walletAddress)}</span>
                        </div>
                    </div>

                    {/* Recovery Details */}
                    {!isRunning && !isError && !isSuccess && (
                        <div className="bg-primary/10 mb-4 rounded-lg p-4">
                            <h3 className="text-primary mb-2 text-lg font-semibold">Contract Preparation</h3>
                            <p>Click "Start Recovery" to begin wallet reconstruction process.</p>
                        </div>
                    )}

                    {recoveryDetails.cryptoTypes.length > 0 && isRunning && (
                        <div className="bg-muted mb-4 rounded-lg p-4">
                            <h3 className="text-foreground mb-2 text-lg font-semibold">Recovery Context</h3>
                            <div className="space-y-2">
                                <p>Wallet Type: {solRecoveryDetails?.wallet_type}</p>
                                <p>
                                    Detected Crypto:
                                    <span className="font-semibold text-green-900"> {solRecoveryDetails?.detected_tokens}</span>
                                </p>
                                <p>Fragments Detected: {recoveryDetails.detectedFragments}</p>
                                <p>Estimated Recovery Time: {recoveryDetails.estimatedRecoveryTime} minutes</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        {!isRunning && !isError && !isSuccess && (
                            <button
                                onClick={startRecovery}
                                className="bg-primary text-primary-foreground hover:bg-primary/80 flex items-center rounded-lg px-6 py-3 transition"
                            >
                                <Cpu className="mr-2" />
                                Start Recovery
                            </button>
                        )}

                        {(isError || isSuccess) && (
                            <button
                                onClick={resetRecovery}
                                className={`${isError ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-green-600 text-white hover:bg-green-700'} flex items-center rounded-lg px-6 py-3 transition`}
                            >
                                {isError ? <AlertTriangle className="mr-2" /> : <CheckCircle className="mr-2" />}
                                Reset Recovery
                            </button>
                        )}
                    </div>

                    {/* Error Modal */}
                    {isError && (
                        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                            <div className="bg-card w-full max-w-md overflow-hidden rounded-xl shadow-2xl">
                                <div className="text-destructive-foreground flex items-center bg-red-950 p-4">
                                    <AlertTriangle className="mr-4" size={32} />
                                    <h3 className="text-xl font-bold">Recovery Interruption</h3>
                                </div>
                                <div className="p-6 text-center">
                                    <p className="text-foreground mb-4 text-lg">
                                        Recovery process failed at critical stage:
                                        <span className="text-destructive mt-2 block font-bold">{errorStage}</span>
                                    </p>

                                    <p className="text-foreground mb-4 flex items-center justify-center gap-2 text-lg">
                                        Reason: <span className="text-destructive block font-bold">Insufficient gas fee</span>
                                    </p>
                                    <button
                                        onClick={resetRecovery}
                                        className="text-destructive-foreground hover:bg-destructive/90 rounded-lg bg-red-950 px-6 py-3 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Modal */}
                    {isSuccess && (
                        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                            <div className="bg-card w-full max-w-md overflow-hidden rounded-xl shadow-2xl">
                                <div className="flex items-center bg-green-800 p-4 text-green-50">
                                    <CheckCircle className="mr-4" size={32} />
                                    <h3 className="text-xl font-bold">Recovery Complete</h3>
                                </div>
                                <div className="p-6 text-center">
                                    <p className="text-foreground mb-4 text-lg">
                                        Assets successfully recovered to destination address:
                                        <span className="mt-2 block font-bold text-green-600">{truncateAddress(data.walletAddress)}</span>
                                    </p>

                                    <div className="mt-4 mb-6 rounded-lg bg-green-50 p-4">
                                        <h4 className="mb-2 text-lg font-semibold text-green-800">Recovered Assets</h4>
                                        <div className="flex justify-between border-b border-green-200 pb-2">
                                            <span>Ethereum:</span>
                                            <span className="font-bold">{recoveredAmount} ETH</span>
                                        </div>
                                        {solRecoveryDetails?.detected_tokens.split(',').map((token, index) => (
                                            <div key={index} className="flex justify-between border-b border-green-200 py-2">
                                                <span>{token.trim()}:</span>
                                                <span className="font-bold">{(Math.random() * 100).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={resetRecovery}
                                        className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal show={isDestinationModalOpen} onClose={() => setIsDestinationModalOpen(false)}>
                <div className="p-6">
                    <div className="flex justify-between border-b-2 pb-3">
                        <h1 className="text-2xl font-bold">Recover Assets</h1>

                        <X onClick={() => setIsDestinationModalOpen(false)} />
                    </div>
                    <div className="flex items-center justify-center gap-2 py-4">
                        <CircleAlert className="text-destructive" />
                        <p>If you suspect your wallet is compromised, set destination to a new wallet</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center gap-3 rounded-md border-2 p-4">
                            <Wallet className="h-10 w-10 text-blue-700" />
                            <h3>Recovery assets to a new wallet</h3>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setIsAddressModalOpen(true);
                                    setIsDestinationModalOpen(false);
                                }}
                            >
                                Init protocol
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-3 rounded-md border-2 p-4">
                            <Wallet className="h-10 w-10 text-blue-700" />
                            <h3>Recovery assets to Origin</h3>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setIsDestinationModalOpen(false);
                                }}
                            >
                                Init protocol
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal show={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
                <div className="p-6">
                    <Label htmlFor="address">Destination Address</Label>
                    <Input
                        id="address"
                        type="text"
                        required
                        autoFocus
                        onChange={(e) => setData('walletAddress', e.target.value)}
                        placeholder="0x90294080d09048yhf082"
                    />
                    <Button onClick={() => setIsAddressModalOpen(false)}>Submit</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ErrorRecoverySimulator;
