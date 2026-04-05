import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, Building2, LineChart, Wallet,
    Smartphone, User, Mail, Camera
} from 'lucide-react';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';

const INITIAL_INTEGRATIONS = [
    { id: 1, name: 'HDFC Bank', desc: 'Sync real-time bank transactions', icon: Building2, status: 'connected', color: '#004C8F' },
    { id: 2, name: 'Zerodha Kite', desc: 'Live stock market portfolio data', icon: LineChart, status: 'connected', color: '#FF5722' },
    { id: 3, name: 'Google Pay (UPI)', desc: 'Track daily UPI settlements', icon: Smartphone, status: 'connected', color: '#4285F4' },
    { id: 4, name: 'Razorpay', desc: 'Payment gateway analytics', icon: CreditCard, status: 'disconnected', color: '#02042B' },
    { id: 5, name: 'Groww', desc: 'Mutual funds and SIP tracking', icon: Smartphone, status: 'disconnected', color: '#00D09C' },
    { id: 6, name: 'Binance', desc: 'Crypto wallet balances', icon: Wallet, status: 'disconnected', color: '#F3BA2F' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Settings() {
    const { role, theme } = useDashboardStore();
    const isDark = theme === 'dark';
    const accent = ACCENTS[role];
    const isAdmin = role === 'admin';

    const [profile, setProfile] = useState({
        name: 'Varun Panchal',
        email: 'VarunPanchal2004.codes@gmail.com'
    });

    const [apps, setApps] = useState(INITIAL_INTEGRATIONS);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const toggleIntegration = (id) => {
        if (!isAdmin) return;
        setApps(prev => prev.map(app =>
            app.id === id ? { ...app, status: app.status === 'connected' ? 'disconnected' : 'connected' } : app
        ));
    };

    // Styling Tokens
    const itemBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const textColor = isDark ? '#f0f0f0' : '#1a1a1a';
    const inputBg = isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)';

    const SectionHeader = ({ title, subtitle }) => (
        <div className="mb-6 mt-10">
            <div className="flex items-center gap-4 mb-1">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: accent.hex }}>{title}</h2>
                <div className="h-[1px] w-full" style={{ background: borderColor }}></div>
            </div>
            {subtitle && <p className="text-sm opacity-50" style={{ color: textColor }}>{subtitle}</p>}
        </div>
    );

    return (
        <div className="w-full min-h-screen p-4 md:p-8 lg:p-10 transition-colors duration-500 overflow-x-hidden">
            {/* Removed max-w-7xl to let it fill the screen */}
            <div className="w-full mx-auto">

                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ color: textColor }}>Settings</h1>
                    <p className="text-sm md:text-base opacity-50" style={{ color: textColor }}>Manage your identity, billing, and connected ecosystem.</p>
                </header>

                {/* PROFILE SECTION - Fluid Layout */}
                <SectionHeader title="Account Identity" />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <motion.div
                        variants={fadeInUp} initial="hidden" animate="visible"
                        className="xl:col-span-3 p-8 rounded-2xl border flex flex-col items-center text-center justify-center min-h-[250px]"
                        style={{ background: itemBg, borderColor }}
                    >
                        <div className="relative mb-4">
                            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-transparent shadow-xl" style={{ ringColor: accent.hex }}>
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt="avatar" className="w-full h-full" />
                            </div>
                            {isAdmin && (
                                <button className="absolute bottom-1 right-1 p-2.5 rounded-full bg-white text-black shadow-xl hover:scale-110 transition-transform border border-black/5">
                                    <Camera size={16} />
                                </button>
                            )}
                        </div>
                        <h3 className="font-bold text-xl" style={{ color: textColor }}>{profile.name}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1" style={{ color: textColor }}>{role} Access</p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp} initial="hidden" animate="visible"
                        className="xl:col-span-9 p-6 md:p-10 rounded-2xl border"
                        style={{ background: itemBg, borderColor }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        disabled={!isAdmin}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none outline-none focus:ring-2 transition-all text-sm font-medium"
                                        style={{ background: inputBg, color: textColor, ringColor: accent.hex }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase opacity-50 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        disabled={!isAdmin}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-none outline-none focus:ring-2 transition-all text-sm font-medium"
                                        style={{ background: inputBg, color: textColor, ringColor: accent.hex }}
                                    />
                                </div>
                            </div>
                        </div>
                        {isAdmin && (
                            <button
                                className="w-full md:w-auto px-10 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                                style={{ background: accent.gradient || accent.hex, color: '#fff' }}
                            >
                                Save Profile Changes
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* BILLING SECTION - Side by side on large, stacked on small */}
                <SectionHeader title="Billing & Subscription" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-8 rounded-2xl border flex flex-col justify-between min-h-[200px]" style={{ background: itemBg, borderColor }}>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="font-bold text-2xl" style={{ color: textColor }}>Growth Plan</h3>
                                <p className="text-xs opacity-50 mt-1">Renews Dec 12, 2026</p>
                            </div>
                            <div className="text-3xl font-bold" style={{ color: textColor }}>$39<span className="text-sm opacity-30 ml-1">/mo</span></div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                <span className="opacity-60">Seat Usage</span>
                                <span style={{ color: accent.hex }}>14 / 20 Active</span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-black/10 overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1 }} className="h-full shadow-sm" style={{ background: accent.hex }} />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl border flex items-center gap-6" style={{ background: itemBg, borderColor }}>
                        <div className="w-20 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold italic text-sm shadow-inner">VISA</div>
                        <div className="flex-1">
                            <p className="font-bold text-lg tracking-wider" style={{ color: textColor }}>•••• •••• •••• 1234</p>
                            <p className="text-[10px] font-bold uppercase opacity-40 mt-0.5">Primary Method • Exp 12/28</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-current opacity-60 hover:opacity-100 transition-opacity" style={{ color: accent.hex }}>Update</button>
                    </div>
                </div>

                {/* INTEGRATIONS - Dynamic Grid Columns */}
                <SectionHeader title="Integrations" subtitle="Manage high-speed data tunnels between your providers." />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-20">
                    {apps.map((app) => (
                        <motion.div
                            key={app.id}
                            whileHover={{ y: -4 }}
                            className="p-6 rounded-2xl border flex flex-col group transition-all"
                            style={{ background: itemBg, borderColor }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl shadow-sm" style={{ background: `${app.color}15`, color: app.color }}>
                                    <app.icon size={24} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-bold uppercase opacity-40 tracking-tighter">
                                        {app.status === 'connected' ? 'Active' : 'Idle'}
                                    </span>
                                    <div className={`w-2 h-2 rounded-full ${app.status === 'connected' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-30'}`} />
                                </div>
                            </div>
                            <h4 className="font-bold text-base mb-1" style={{ color: textColor }}>{app.name}</h4>
                            <p className="text-xs opacity-50 mb-6 flex-1 leading-relaxed">{app.desc}</p>

                            <button
                                onClick={() => toggleIntegration(app.id)}
                                disabled={!isAdmin}
                                className={`w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all border ${app.status === 'connected'
                                    ? 'border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                    : 'border-transparent bg-black/5 hover:bg-black/10'
                                    } ${!isAdmin && 'opacity-20 cursor-not-allowed'}`}
                                style={{ color: app.status !== 'connected' ? textColor : '' }}
                            >
                                {app.status === 'connected' ? 'Disconnect' : 'Connect Link'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}