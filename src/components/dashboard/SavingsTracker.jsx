import React from 'react';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { Target, TrendingUp, Laptop, Car, Home, Inbox } from 'lucide-react';
import { SAVINGS_GOALS } from '../../data/mockTransactions';

// Icon configuration mapping
const GOAL_CONFIG = {
    "MacBook Pro": { Icon: Laptop, color: '#A2A2A2' },
    "New Car": { Icon: Car, color: '#FF6F61' },
    "New House": { Icon: Home, color: '#4CAF50' },
    "Deposits": { Icon: TrendingUp, color: '#4C84FF' },
};

const formatShorthand = (val) => {
    if (!val || val === 0) return '0';
    if (val >= 100000) {
        return `${(val / 100000).toFixed(1)}L`;
    }
    return `${(val / 1000).toFixed(1)}k`;
};

export default function SavingsTracker() {
    const { role, theme } = useDashboardStore();
    const isDark = theme === 'dark';
    const accent = ACCENTS[role] || { hex: '#10b981', gradient: 'linear-gradient(to right, #10b981, #3b82f6)' };

    // Use the imported data directly
    const savingsData = SAVINGS_GOALS || [];
    const hasData = savingsData.length > 0;

    const islandStyle = {
        background: isDark ? 'rgba(18, 18, 24, 0.92)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: isDark
            ? '0 12px 48px rgba(0,0,0,0.5), 0 2px 0px rgba(255,255,255,0.04) inset'
            : '0 6px 32px rgba(0,0,0,0.1), 0 1px 0px rgba(255,255,255,0.9) inset',
        border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
    };

    const textColor = isDark ? '#fff' : '#0f172a';

    return (
        <div className="w-full flex flex-col gap-2">
            {/* Header Island */}
            <div className="flex items-center justify-between px-5 py-4 rounded-[1.5rem]" style={islandStyle}>
                <div className="flex items-center gap-2">
                    <Target size={20} className="opacity-50" style={{ color: textColor }} />
                    <h1 className="text-base font-bold tracking-tight uppercase opacity-90" style={{ color: textColor }}>
                        Savings
                    </h1>
                </div>
                {hasData && (
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                        Active
                    </span>
                )}
            </div>

            {/* List Section */}
            <div className="flex flex-col gap-2">
                {hasData ? (
                    savingsData.map((goal, index) => {
                        // Calculate progress safely
                        const goalVal = goal.goal || 1;
                        const savedVal = goal.saved || 0;
                        const progressPercent = Math.min(100, (savedVal / goalVal) * 100);

                        // Find the icon and color from the config mapping
                        const config = GOAL_CONFIG[goal.name] || { Icon: Target, color: '#94a3b8' };
                        const Icon = config.Icon;

                        return (
                            <div key={index} className="flex flex-col gap-3 px-5 py-5 rounded-[2rem] relative group transition-all duration-300" style={islandStyle}>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center p-3 rounded-xl"
                                        style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                                        <Icon size={22} style={{ color: config.color }} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-end mb-1.5">
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
                                                {goal.name}
                                            </p>
                                            <p className="text-xs font-bold" style={{ color: accent.hex }}>
                                                {Math.round(progressPercent)}%
                                            </p>
                                        </div>

                                        <div className="relative h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-white/10">
                                            <div className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-1000"
                                                style={{ width: `${progressPercent}%`, background: accent.gradient }} />
                                        </div>
                                    </div>

                                    <div className="text-right pl-3">
                                        <p className="text-base font-extrabold tracking-tight" style={{ color: textColor }}>
                                            ₹{formatShorthand(savedVal)}
                                            <span className="opacity-40 font-semibold ml-0.5 text-sm">
                                                /{formatShorthand(goalVal)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-10 rounded-[2rem] opacity-20" style={islandStyle}>
                        <Inbox size={40} className="mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No Goals Set</p>
                    </div>
                )}
            </div>
        </div>
    );
}