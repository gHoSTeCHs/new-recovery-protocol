class AddressChain {
    /**
     * Checks if a string is a valid blockchain address and returns its type
     * @param address The address string to check
     * @returns An object containing validation result and address type
     */
    public checkAddress(address: string): {
        isValid: boolean;
        type: 'ETH' | 'SOL' | 'UNKNOWN';
        message: string;
    } {
        if (!address) {
            return {
                isValid: false,
                type: 'UNKNOWN',
                message: 'Address is empty or undefined',
            };
        }

        const isEthAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
        if (isEthAddress) {
            return {
                isValid: true,
                type: 'ETH',
                message: 'Valid Ethereum address',
            };
        }

        const isSolAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
        if (isSolAddress) {
            return {
                isValid: true,
                type: 'SOL',
                message: 'Valid Solana address',
            };
        }

        return {
            isValid: false,
            type: 'UNKNOWN',
            message: 'Not a valid blockchain address',
        };
    }
}

export default AddressChain;
