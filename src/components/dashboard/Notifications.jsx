import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { MOCK_HISTORY, mockSubscriptions } from '../../data/mockTransactions';
import {
    History as HistoryIcon,
    CheckCircle2,
    Timer,
    Search,
    Pencil,
    CreditCard,
    Calendar,
    Settings2,
    MoreVertical
} from 'lucide-react';

export default function Notifications() {
    const { theme, role } = useDashboardStore();
    const accent = ACCENTS[role];
    const isDark = theme === 'dark';
    const isAdmin = role === 'admin';

    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const itemBg = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)';
    const cardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff';
    const textColor = isDark ? '#fff' : '#1a1a1a';

    const filteredTransactions = MOCK_HISTORY.filter(tx => {
        const matchesSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || tx.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 min-h-screen relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 transition-all duration-700"
                    style={{ background: `radial-gradient(circle, rgba(${accent.rgb}, 0.4) 0%, transparent 70%)` }}
                />
            </div>

            <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-3 gap-10">

                {/* --- SECTION A: SUBSCRIPTIONS --- */}
                <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shadow-sm">
                                <CreditCard size={20} />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight" style={{ color: textColor }}>Active Subs</h2>
                        </div>
                        {isAdmin && <Settings2 size={18} className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity" />}
                    </div>

                    <div className="grid gap-4">
                        {mockSubscriptions.map((sub, index) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.01,
                                    ease: "easeOut"
                                }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="p-5 rounded-[32px] border relative"
                                style={{ background: cardBg, borderColor }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white p-2 shadow-sm flex items-center justify-center border border-black/5">
                                            <img src={sub.icon} className="w-full h-full object-contain" alt="" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm leading-tight" style={{ color: textColor }}>{sub.name.split('-')[0]}</h4>
                                            <p className="text-lg font-black mt-0.5" style={{ color: accent.hex }}>₹{sub.price}</p>
                                        </div>
                                    </div>
                                    {isAdmin && (
                                        <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                                            <Pencil size={14} style={{ color: accent.hex }} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 opacity-40">
                                        <Calendar size={12} style={{ color: textColor }} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: textColor }}>Next: {sub.next}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-tighter text-emerald-500">Active</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- SECTION B: TRANSACTION ACTIVITY --- */}
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shadow-sm">
                                <HistoryIcon size={20} />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight" style={{ color: textColor }}>Recent Activity</h2>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 rounded-2xl border text-sm w-full sm:w-64 outline-none transition-all"
                                style={{ background: itemBg, borderColor, color: textColor }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                        {['All', 'Shopping', 'Food', 'Bills', 'Subscription'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${activeCategory === cat ? 'text-white border-transparent' : 'text-slate-400 border-white/10'}`}
                                style={{ background: activeCategory === cat ? accent.hex : 'transparent' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredTransactions.map((tx, index) => (
                                <motion.div
                                    layout
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95, filter: 'blur(4px)' }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.01,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{ x: 10, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }}
                                    className="group relative p-5 rounded-[28px] border flex items-center justify-between cursor-pointer"
                                    style={{ background: itemBg, borderColor }}
                                >
                                    <div className={`absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-full ${tx.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-3 border border-black/5 shrink-0 shadow-sm transition-transform group-hover:scale-105">
                                            <img src={tx.logo} className="w-full h-full object-contain" alt="" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-tight" style={{ color: textColor }}>{tx.name}</h4>
                                            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest mt-1" style={{ color: textColor }}>{tx.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right flex flex-col items-end gap-1.5">
                                            <div className={`text-xl font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : textColor}`}>
                                                {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                            </div>
                                            <div className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-black uppercase border ${tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                                                {tx.status === 'Pending' ? <Timer size={10} /> : <CheckCircle2 size={10} />}
                                                {tx.status}
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex items-center gap-1 pl-4 border-l border-white/5">
                                                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                                                    <Pencil size={14} style={{ color: accent.hex }} />
                                                </button>
                                                <button className="hidden sm:block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                                                    <MoreVertical size={14} className="opacity-30" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}