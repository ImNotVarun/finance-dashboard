import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Newspaper, TrendingUp, ExternalLink,
    LayoutDashboard, Wallet, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

import CurrencyConverter from './CurrencyConverter';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { MOCK_NEWS, MOCK_HISTORY, getRevenueData } from '../../data/mockTransactions';

// --- SUB-COMPONENT: SUMMARY CARDS ---
const SummaryCards = ({ accent, isDark, textColor }) => {
    const stats = useMemo(() => {
        const income = MOCK_HISTORY.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const expense = Math.abs(MOCK_HISTORY.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0));
        return { balance: income - expense, income, expense };
    }, []);

    const cards = [
        { title: 'Total Balance', amount: stats.balance, icon: <Wallet size={20} />, color: accent.hex },
        { title: 'Total Income', amount: stats.income, icon: <ArrowUpRight size={20} />, color: '#10b981' },
        { title: 'Total Expenses', amount: stats.expense, icon: <ArrowDownRight size={20} />, color: '#ef4444' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-5 rounded-[32px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="p-3 rounded-2xl" style={{ background: `${card.color}15`, color: card.color }}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-sm opacity-50 mb-0.5" style={{ color: textColor }}>{card.title}</p>
                    <h3 className="text-xl font-black" style={{ color: textColor }}>
                        ₹{card.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h3>
                </motion.div>
            ))}
        </div>
    );
};

// --- SUB-COMPONENT: CHARTS ---
const DashboardCharts = ({ isDark, accent, textColor }) => {
    const trendData = getRevenueData('Monthly');
    const categoryData = useMemo(() => {
        const groups = MOCK_HISTORY.filter(t => t.type === 'expense').reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
            return acc;
        }, {});
        return Object.keys(groups).map(name => ({ name, value: groups[name] }));
    }, []);

    const COLORS = [accent.hex, '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-0">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className={`p-6 rounded-[40px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                <h4 className="font-bold text-lg mb-4" style={{ color: textColor }}>Balance Trend</h4>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={accent.hex} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={accent.hex} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="label" hide />
                            <Tooltip contentStyle={{ backgroundColor: isDark ? '#1a1a1a' : '#fff', borderRadius: '20px', border: 'none' }} />
                            <Area type="monotone" dataKey="revenue" stroke={accent.hex} strokeWidth={3} fillOpacity={1} fill="url(#colorTrend)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className={`p-6 rounded-[40px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                <h4 className="font-bold text-lg mb-4" style={{ color: textColor }}>Spending Breakdown</h4>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={categoryData} innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default function Analytics() {
    const { role, theme } = useDashboardStore();
    const isDark = theme === 'dark';
    const accent = ACCENTS[role];

    const itemBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#fff' : '#1a1a1a';

    return (
        <div className="w-full min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">

                {/* 1. FULL WIDTH DASHBOARD SECTION */}
                <section className="mb-12">
                    <motion.div className="flex items-center gap-4 mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                            <LayoutDashboard size={24} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight" style={{ color: textColor }}>Financial Overview</h2>
                    </motion.div>

                    <SummaryCards accent={accent} isDark={isDark} textColor={textColor} />
                    <DashboardCharts accent={accent} isDark={isDark} textColor={textColor} />
                </section>

                {/* 2. 1/3 vs 2/3 GRID SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                    {/* (CurrencyConverter and Market Feed code continues below) */}
                    <motion.div className="lg:col-span-1 flex flex-col items-center">
                        <div className="w-full"><CurrencyConverter /></div>
                    </motion.div>
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 shadow-sm"><Newspaper size={24} /></div>
                            <h2 className="text-3xl font-bold tracking-tight" style={{ color: textColor }}>Market Feed</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                            {MOCK_NEWS?.map((news, index) => (
                                <motion.div key={index} className="p-6 rounded-[32px] border relative group cursor-pointer overflow-hidden" style={{ background: itemBg, borderColor }}>
                                    {/* News Item Content */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5" style={{ background: `${accent.hex}15`, color: accent.hex }}>{news.tag}</span>
                                        <span className="text-[10px] opacity-40 font-bold uppercase" style={{ color: textColor }}>{news.time}</span>
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight mb-5 group-hover:text-blue-400 transition-colors" style={{ color: textColor }}>{news.title}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}