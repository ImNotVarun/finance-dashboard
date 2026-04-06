import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, DollarSign, IndianRupee } from 'lucide-react';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';

const CURRENCIES = {
    USD: { label: 'USD', icon: <DollarSign size={20} />, rate: 1 },
    INR: { label: 'INR', icon: <IndianRupee size={20} />, rate: 92.74 }
};

export default function CurrencyConverter() {
    const { theme, role } = useDashboardStore();
    const accent = ACCENTS[role];
    const isDark = theme === 'dark';

    const [amount, setAmount] = useState(1);
    const [fromCur, setFromCur] = useState('USD');
    const [toCur, setToCur] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [isSwapping, setIsSwapping] = useState(false);

    useEffect(() => {
        const fromRate = CURRENCIES[fromCur].rate;
        const toRate = CURRENCIES[toCur].rate;
        const result = (amount / fromRate) * toRate;
        setConvertedAmount(result.toFixed(2));
    }, [amount, fromCur, toCur]);

    const handleSwap = () => {
        setIsSwapping(true);
        setFromCur(toCur);
        setToCur(fromCur);
        setTimeout(() => setIsSwapping(false), 500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full p-6 rounded-[32px] relative overflow-hidden transition-all duration-500"
            style={{
                background: isDark ? '#121218' : '#ffffff',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.1)'
            }}>

            <div className="relative flex flex-col gap-1.5">

                {/* INPUT BOX (Top) */}
                <motion.div
                    className="p-6 rounded-[24px] border z-0"
                    whileHover={{
                        scale: 1.01,
                        borderColor: accent.hex,
                        boxShadow: `0 0 25px rgba(${accent.rgb}, 0.25)`
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                        Send Amount
                    </label>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <motion.div
                                key={fromCur}
                                initial={{ rotateY: 90 }}
                                animate={{ rotateY: 0 }}
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5"
                                style={{ color: accent.hex }}
                            >
                                {CURRENCIES[fromCur].icon}
                            </motion.div>
                            <span className="font-bold text-xl">{fromCur}</span>
                        </div>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent text-right text-3xl font-semibold outline-none w-1/2 cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            style={{ color: isDark ? '#fff' : '#000' }}
                        />
                    </div>
                </motion.div>

                {/* VERTICAL SWAP BUTTON */}
                <motion.button
                    onClick={handleSwap}
                    whileHover={{ scale: 1.2, rotate: isSwapping ? 360 : 90 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ rotate: isSwapping ? 360 : 90 }}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
                    style={{
                        background: accent.hex,
                        color: '#fff',
                        border: isDark ? '4px solid #121218' : '4px solid #fff',
                        boxShadow: `0 8px 20px rgba(${accent.rgb}, 0.4)`,
                    }}
                >
                    <ArrowLeftRight size={20} />
                </motion.button>

                {/* OUTPUT BOX (Bottom) */}
                <div
                    className="p-6 rounded-[24px] border"
                    style={{
                        background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">
                        Estimated Received
                    </label>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <motion.div
                                key={toCur}
                                initial={{ rotateY: 90 }}
                                animate={{ rotateY: 0 }}
                                className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/5"
                                style={{ color: accent.hex }}
                            >
                                {CURRENCIES[toCur].icon}
                            </motion.div>
                            <span className="font-bold text-xl">{toCur}</span>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={convertedAmount}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-right text-3xl font-semibold opacity-90"
                            >
                                {new Intl.NumberFormat('en-IN').format(convertedAmount)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTON */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 rounded-2xl font-bold text-lg"
                style={{
                    background: isDark ? '#fff' : '#000',
                    color: isDark ? '#000' : '#fff',
                    boxShadow: `0 10px 20px rgba(0,0,0,0.2)`
                }}
            >
                Confirm Exchange
            </motion.button>

            <p className="text-center text-[10px] mt-4 text-slate-500 uppercase tracking-widest font-bold opacity-60">
                Live Rate: 1 {fromCur} = {(convertedAmount / (amount || 1)).toFixed(4)} {toCur}
            </p>
        </motion.div>
    );
}