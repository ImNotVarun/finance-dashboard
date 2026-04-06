import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { MOCK_HISTORY } from '../../data/mockTransactions';

export default function SummaryCards({ accent, isDark }) {
    const totalIncome = MOCK_HISTORY.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = Math.abs(MOCK_HISTORY.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0));
    const balance = totalIncome - totalExpense;

    const cards = [
        { title: 'Total Balance', amount: balance, icon: <Wallet size={20} />, color: accent.hex },
        { title: 'Income', amount: totalIncome, icon: <ArrowUpRight size={20} />, color: '#10b981' },
        { title: 'Expenses', amount: totalExpense, icon: <ArrowDownRight size={20} />, color: '#ef4444' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 xl:-mt-5">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-[24px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="p-2 rounded-lg" style={{ background: `${card.color}20`, color: card.color }}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-sm opacity-50 mb-1">{card.title}</p>
                    <h3 className="text-2xl font-bold">₹{card.amount.toLocaleString()}</h3>
                </motion.div>
            ))}
        </div>
    );
}