import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };

    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;

    [key: string]: unknown; // This allows for additional properties...
}

interface RecoveryDetailsType {
    id: number;
    gasFee: string;
    gasFee_address: string;
    detected_tokens: string;
    wallet_type: string;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    hash: string;
    method: string;
    block: string;
    age: string;
    from: string;
    to: string;
    amount: string;
    fee: string;
    direction?: 'IN' | 'OUT';
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface AccountData {
    address: string;
    balance: string;
    txCount: number;
    firstSeen: string;
    lastSeen: string;
    totalReceived: string;
    totalSpent: string;
    incomingTx: number;
    outgoingTx: number;
    riskScore: number;
    riskLevel: RiskLevel;
}

interface RecoveryDetailsType {
    id: number;
    gasFee: string;
    gasFee_address: string;
    detected_tokens: string;
    wallet_type: string;
    created_at: string;
    updated_at: string;
}

export interface AddressTransactions {
    address: string;
    hash: string;
    method: string;
    block: string;
    age: string;
    from: string;
    to: string;
    amount: string;
    fee: string;
    direction?: 'IN' | 'OUT';
}

export interface RecoveryAddressDetailsType {
    id: number;
    user_id: number;
    token_name: string;
    token_amount: number;
    wallet_address: string;
    wallet_name: string;
    created_at: Date;
    updated_at: Date;
}
