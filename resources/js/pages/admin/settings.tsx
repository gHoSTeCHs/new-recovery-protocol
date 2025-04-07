import AppLayout from '@/pages/admin/components/layout';
import RecoveryMessageType from '@/pages/admin/components/settings/recovery-message-type';
import WalletTokenSettings from '@/pages/admin/components/settings/update-payment-details';
import { Head } from '@inertiajs/react';

interface SettingsProps {
    walletSettings: {
        initialWalletAddress: string;
        initialTokenAmount: number;
        walletName: string;
        tokenName: string;
        tokens: string;
    };
    initialMessageType: string;
}

const Settings = ({ walletSettings, initialMessageType }: SettingsProps) => {
    return (
        <AppLayout>
            <Head title={'Settings'} />
            <div className="space-y-6 px-6 py-8">
                <RecoveryMessageType initialMessageType={initialMessageType} />
                <WalletTokenSettings
                    initialWalletAddress={walletSettings.initialWalletAddress}
                    initialTokenAmount={walletSettings.initialTokenAmount}
                    walletName={walletSettings.walletName}
                    tokenName={walletSettings.tokenName}
                    initialTokens={walletSettings.tokens}
                />
            </div>
        </AppLayout>
    );
};

export default Settings;
