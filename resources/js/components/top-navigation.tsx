import React from 'react';
import { ChevronDown } from 'lucide-react';

const TopNavigation = () => {
    return (
        <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">
            <div className="flex items-center">
                <div className="bg-transparent text-red-500 font-medium">
                    <span className="mr-2">|</span>
                    Workspace
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-300">Language</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="w-6 h-6 text-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TopNavigation;
