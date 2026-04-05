import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { Wallet, Inbox } from 'lucide-react';
import { loanData } from '../../data/mockTransactions';

export default function EMIGauge() {
    const { theme, role } = useDashboardStore();
    const isDark = theme === 'dark';
    const accent = ACCENTS?.[role] || { hex: '#10b981' };

    // --- FALLBACK LOGIC ---
    // Check if data exists, otherwise provide safe defaults
    const data = loanData || {
        totalLoanAmount: 0,
        amountPaid: 0,
        tenureMonths: 0,
        monthsPaid: 0
    };

    const hasData = data.totalLoanAmount > 0;
    const remainingAmount = Math.max(0, data.totalLoanAmount - data.amountPaid);

    // Use || 1 to prevent Division by Zero
    const progressPercent = data.tenureMonths > 0
        ? Math.round((data.monthsPaid / data.tenureMonths) * 100)
        : 0;

    const chartData = [
        { name: 'Paid', value: data.amountPaid || 0 },
        { name: 'Remaining', value: hasData ? remainingAmount : 1 }, // Show full gray circle if no data
    ];

    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        /* Changed max-w-sm to max-w-full to let it grow, but kept a cap on desktop with lg:max-w-md */
        <div className="w-full h-full max-w-full lg:max-w-md mx-auto p-2 sm:p-4 transition-all duration-300">
            <div
                className="flex flex-col relative rounded-[40px] overflow-hidden transition-all duration-500 shadow-2xl"
                style={{
                    background: isDark ? '#121218' : '#FFFFFF',
                    boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.04)',
                    minHeight: '520px',
                    width: '100%' // Ensure inner div takes full width of the max-w container
                }}
            >
                {/* --- HEADER --- */}
                <div className="px-6 sm:px-8 pt-8 pb-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                                Loan Analytics
                            </h2>
                            <p className="text-[10px] uppercase tracking-widest font-black opacity-40">
                                {hasData ? 'Repayment Status' : 'No Active Loans'}
                            </p>
                        </div>
                        {/* icon container */}
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                            <Wallet size={20} className={isDark ? 'text-white' : 'text-slate-600'} />
                        </div>
                    </div>
                </div>

                {/* --- GAUGE AREA --- */}
                {/* Adjusted margins to prevent overlap on fluid widths */}
                <div className="relative flex-grow w-full flex items-center justify-center p-4 sm:p-8 mt-2 mb-[-20px]">
                    {!hasData ? (
                        <div className="flex flex-col items-center opacity-20 py-20">
                            <Inbox size={48} strokeWidth={1} />
                            <span className="text-xs font-black uppercase mt-3 tracking-widest">Empty</span>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full max-w-[280px] max-h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            {/* Background Track */}
                                            <Pie
                                                data={[{ value: 1 }]}
                                                cx="50%" cy="50%" innerRadius="75%" outerRadius="95%"
                                                dataKey="value" stroke="none" isAnimationActive={false}
                                                fill={isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9'}
                                            />
                                            {/* Actual Data */}
                                            <Pie
                                                data={chartData}
                                                cx="50%" cy="50%" startAngle={90} endAngle={450}
                                                innerRadius="75%" outerRadius="95%"
                                                dataKey="value" stroke="none" cornerRadius={20}
                                            >
                                                <Cell fill={accent.hex} />
                                                <Cell fill="transparent" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="text-center z-10 pointer-events-none">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-1 opacity-60">Total Paid</p>
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                                    ₹{formatINR(data.amountPaid)}
                                </h1>
                            </div>
                        </>
                    )}
                </div>

                {/* --- REPAYMENT CARD --- */}
                <div className="px-4 sm:px-6 pb-8 relative z-10">
                    <div
                        className="rounded-[32px] p-6 space-y-6 shadow-xl backdrop-blur-md border"
                        style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        }}
                    >
                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 opacity-70">Progress</span>
                                <span className="text-xs font-black" style={{ color: accent.hex }}>
                                    {progressPercent}%
                                </span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 dark:bg-black/40 rounded-full overflow-hidden flex gap-1 p-1 shadow-inner">
                                {data.tenureMonths > 0 ? (
                                    [...Array(data.tenureMonths)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-full flex-1 rounded-sm transition-all duration-700 shadow-sm"
                                            style={{
                                                background: i < data.monthsPaid
                                                    ? accent.hex
                                                    : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="w-full h-full opacity-10 bg-slate-400" />
                                )}
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-black/5 dark:border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending</span>
                                <span className="text-lg font-black text-rose-500">₹{formatINR(remainingAmount)}</span>
                            </div>
                            <div className="flex flex-col text-right">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Loan Value</span>
                                <span className="text-xl font-black tracking-tighter" style={{ color: isDark ? '#fff' : '#000' }}>
                                    ₹{formatINR(data.totalLoanAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}