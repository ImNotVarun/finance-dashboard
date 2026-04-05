import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useDashboardStore } from '../../store/useDashboardStore';
import { ChevronDown, TrendingUp, BarChart3 } from 'lucide-react';
import { getRevenueData } from '../../data/mockTransactions';

export default function RevenueExpensesChart() {
    const { theme, role } = useDashboardStore();
    // 1. Set Monthly as main choice
    const [view, setView] = useState('Monthly');
    const [showDropdown, setShowDropdown] = useState(false);
    const isDark = theme === 'dark';
    const data = getRevenueData(view);

    const revenueColor = '#10b981';
    const getExpenseColor = () => {
        if (role === 'admin') return isDark ? '#fb7185' : '#f43f5e';
        return isDark ? '#a78bfa' : '#8b5cf6';
    };
    const expenseColor = getExpenseColor();

    // Dynamic totals based on data
    const totalIncome = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalPaid = data.reduce((sum, item) => sum + Math.abs(item.expenses), 0);

    return (
        <div className="w-full h-full max-w-xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col relative rounded-[40px] overflow-hidden transition-all duration-500"
                style={{
                    background: isDark ? '#121218' : '#FFFFFF',
                    boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 25px rgba(0,0,0,0.05)',
                    minHeight: '520px'
                }}>

                {/* Header with Dropdown */}
                <div className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0 relative z-50">
                    <h2 className="text-xl font-bold tracking-tight" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                        Revenue & Expenses
                    </h2>
                    <div className="relative">
                        <button onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-bold">
                            {view} <ChevronDown size={14} />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-32 rounded-2xl p-2 shadow-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#1e1e26]">
                                {['Monthly', 'Weekly'].map((option) => (
                                    <button key={option} onClick={() => { setView(option); setShowDropdown(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${view === option ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-400'}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="px-8 flex gap-8 mb-4 shrink-0">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Total Income</p>
                        <p className="text-xl font-bold text-emerald-500">₹{totalIncome.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Total Paid</p>
                        <p className="text-xl font-bold" style={{ color: expenseColor }}>₹{totalPaid.toLocaleString('en-IN')}</p>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="relative flex-grow min-h-0 w-full px-4">
                    <div className="absolute inset-0 px-4 pb-20 flex items-center justify-center">
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                    <YAxis hide domain={['auto', 'auto']} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', backgroundColor: isDark ? '#1e1e26' : '#fff', border: 'none' }} />

                                    {/* Aligned Bars using stackId="a" */}
                                    <Bar
                                        dataKey="revenue"
                                        stackId="a"
                                        fill={revenueColor}
                                        radius={[6, 6, 0, 0]}
                                        barSize={24}
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        stackId="a"
                                        fill={expenseColor}
                                        radius={[0, 0, 6, 6]}
                                        barSize={24}
                                    />

                                    {/* Optional: A subtle line at 0 to separate them clearly */}
                                    <ReferenceLine y={0} stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                                <BarChart3 className="text-slate-400" size={32} />
                                <p className="text-xs text-slate-400">No {view.toLowerCase()} records found.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profit Footer */}
                <div className="px-5 pb-8 relative z-10">
                    <div className="rounded-[28px] p-5 flex items-center justify-between backdrop-blur-3xl border shadow-xl translate-y-[-10px]"
                        style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-500"><TrendingUp size={20} /></div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Net Profit</p>
                                <p className="text-lg font-black" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>₹{(totalIncome - totalPaid).toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}