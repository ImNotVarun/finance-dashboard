import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, TrendingUp, ExternalLink } from 'lucide-react';
import CurrencyConverter from './CurrencyConverter';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { MOCK_NEWS } from '../../data/mockTransactions';

export default function Analytics() {
    const { role, theme } = useDashboardStore();
    const isDark = theme === 'dark';
    const accent = ACCENTS[role];

    const itemBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#fff' : '#1a1a1a';

    return (
        <div className="w-full min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-12">

                {/* LEFT SIDE: CONVERTER */}
                <motion.div
                    className="w-full lg:w-1/2 flex justify-center"
                    initial={{ opacity: 0, x: -60, filter: 'blur(12px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                    <div className="w-full max-w-md">
                        <CurrencyConverter />
                    </div>
                </motion.div>

                {/* RIGHT SIDE: MARKET FEED */}
                <div className="w-full lg:w-1/2 space-y-8">

                    {/* Header */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: false, margin: '-50px' }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                    >
                        <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 shadow-sm">
                            <Newspaper size={24} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight" style={{ color: textColor }}>
                            Market Feed
                        </h2>
                    </motion.div>

                    {/* News List */}
                    <div className="grid gap-5">
                        {MOCK_NEWS?.map((news, index) => (
                            <motion.div
                                key={news.id}
                                initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                viewport={{ once: false, margin: '-50px' }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.01,
                                    ease: 'easeOut'
                                }}
                                whileHover={{
                                    y: -6,
                                    scale: 1.01,
                                    boxShadow: isDark
                                        ? `0 20px 40px rgba(${accent.rgb}, 0.12)`
                                        : '0 20px 40px rgba(0,0,0,0.08)',
                                    transition: { duration: 0.2 }
                                }}
                                className="p-6 rounded-[32px] border relative group cursor-pointer overflow-hidden"
                                style={{
                                    background: itemBg,
                                    borderColor,
                                    boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.04)'
                                }}
                            >
                                {/* Accent glow on hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[32px]"
                                    style={{
                                        background: `radial-gradient(circle at top right, rgba(${accent.rgb}, 0.07), transparent 70%)`
                                    }}
                                />

                                <div className="flex justify-between items-start mb-4">
                                    <motion.span
                                        className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5"
                                        style={{ background: `${accent.hex}15`, color: accent.hex }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {news.tag}
                                    </motion.span>
                                    <span className="text-[10px] opacity-40 font-bold uppercase" style={{ color: textColor }}>
                                        {news.time}
                                    </span>
                                </div>

                                <h3 className="font-bold text-lg leading-tight mb-5 group-hover:text-blue-400 transition-colors duration-200" style={{ color: textColor }}>
                                    {news.title}
                                </h3>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 flex items-center gap-1.5" style={{ color: textColor }}>
                                        <TrendingUp size={12} /> {news.readTime}
                                    </span>
                                    <motion.div
                                        whileHover={{ x: 3, y: -3 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <ExternalLink size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: textColor }} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* NEWSLETTER CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: false, margin: '-50px' }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                        className="p-8 rounded-[40px] text-center border-2 border-dashed bg-gradient-to-b from-transparent to-white/[0.02] relative overflow-hidden"
                        style={{ borderColor }}
                    >
                        {/* Subtle animated background pulse */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at 50% 0%, rgba(${accent.rgb}, 0.06), transparent 70%)`
                            }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <motion.div
                            className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 shadow-inner"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <TrendingUp className="text-blue-500" size={28} />
                        </motion.div>

                        <h4 className="font-bold text-xl mb-2" style={{ color: textColor }}>Weekly Insights</h4>
                        <p className="text-sm opacity-50 mb-8 leading-relaxed px-6" style={{ color: textColor }}>
                            Get curated financial reports and market shifts delivered to your inbox.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.03, brightness: 1.1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[2px] shadow-lg"
                            style={{ background: accent.gradient || accent.hex, color: '#fff' }}
                        >
                            Join Newsletter
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}