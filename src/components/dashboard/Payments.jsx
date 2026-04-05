import { useState } from 'react';
import { motion } from 'framer-motion'; // 1. Import Framer Motion
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';

export default function Payments() {
    const [billing, setBilling] = useState('yearly');
    const { role, theme } = useDashboardStore();

    const isDark = theme === 'dark';
    const accent = ACCENTS[role];

    const plans = [
        {
            id: 'start',
            name: 'Start',
            price: 15,
            features: ['Up to 5 wallets', 'Basic portfolio tracking', 'Transaction history overview', 'Support 24/7'],
            button: 'Upgrade',
            side: 'left' // Directional metadata
        },
        {
            id: 'growth',
            name: 'Growth',
            price: 39,
            highlight: true,
            features: ['Everything in Start', 'Unlimited wallets', 'Advanced portfolio insights', 'Real-time tax tools', 'Multi-chain support', 'Priority support 24/7'],
            button: 'Manage',
            side: 'center'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: null,
            features: ['Everything in Growth', 'Dedicated manager', 'API integrations', 'Multi-user access', 'Compliance reports'],
            button: 'Contact',
            side: 'right'
        },
    ];

    // --- ANIMATION VARIANTS ---
    const getVariants = (side) => {
        if (side === 'center') {
            return {
                hidden: { opacity: 0, y: -100 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 }
                }
            };
        }
        // Side cards emerge from center
        return {
            hidden: { opacity: 0, x: side === 'left' ? 100 : -100, scale: 0.9 },
            visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                    delay: 0.5, // Wait for center card to land
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    duration: 0.6
                }
            }
        };
    };

    return (
        <div className="w-full flex flex-col items-center overflow-hidden pb-20">
            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12 md:mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
                    Pricing <span className="opacity-70">Plans</span>
                </h1>
                <p className={`text-base md:text-lg mt-5 max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                    Manage, track, and optimize your digital assets with a plan built for your needs.
                </p>

                {/* TOGGLE */}
                <div className={`mt-6 inline-flex items-center gap-1 p-2.5 rounded-full mx-auto shadow-lg ${isDark ? 'bg-white/10 backdrop-blur-md' : 'bg-black/5 border border-black/10'}`}>
                    {['yearly', 'monthly'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setBilling(type)}
                            className={`px-7 py-3 rounded-full text-sm font-medium transition-all relative z-10 ${billing === type ? (isDark ? 'text-black' : 'text-white') : (isDark ? 'text-white/70' : 'text-black/60')}`}
                        >
                            {billing === type && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`absolute inset-0 rounded-full -z-10 ${isDark ? 'bg-white' : 'bg-black'}`}
                                />
                            )}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 -mt-7">
                {plans.map((plan) => {
                    const isHighlight = plan.highlight;

                    return (
                        <motion.div
                            key={plan.id}
                            variants={getVariants(plan.side)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className={`relative rounded-[2.5rem] p-8 flex flex-col justify-between transition-colors
                                ${isHighlight
                                    ? 'bg-black text-white scale-105 z-20 shadow-2xl'
                                    : isDark
                                        ? 'bg-white/5 backdrop-blur-xl text-white/90 z-10 border border-white/10'
                                        : 'bg-white text-black border border-black/5 shadow-xl z-10'
                                }`}
                            style={isHighlight ? { boxShadow: `0 30px 100px rgba(${accent.rgb},0.3)` } : {}}
                        >
                            {isHighlight && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white text-black shadow-lg"
                                >
                                    Most Popular
                                </motion.div>
                            )}

                            <div>
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-tight opacity-60">
                                    {plan.name}
                                </h2>

                                <div className="text-5xl font-black mb-8 flex items-baseline gap-1">
                                    {plan.price ? (
                                        <>
                                            <span className="text-2xl font-medium">$</span>
                                            {billing === 'yearly' ? plan.price : plan.price + 5}
                                            <span className="text-sm font-normal opacity-50 ml-2">/mo</span>
                                        </>
                                    ) : (
                                        <span className="text-3xl">Custom</span>
                                    )}
                                </div>

                                <ul className="space-y-4 text-sm">
                                    {plan.features.map((f, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isHighlight ? 'bg-white/20' : 'bg-black/5'}`}>
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: isHighlight ? '#fff' : accent.hex }} />
                                            </div>
                                            <span className="opacity-80">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                className={`mt-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-95
                                    ${isHighlight
                                        ? 'bg-white text-black hover:bg-opacity-90'
                                        : isDark
                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                            : 'bg-black text-white hover:shadow-lg'
                                    }`}
                                style={{ boxShadow: isHighlight ? `0 10px 30px rgba(255,255,255,0.2)` : '' }}
                            >
                                {plan.button}
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}