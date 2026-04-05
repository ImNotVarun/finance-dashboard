import React, { useState } from 'react';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { ChevronRight, Settings, IndianRupee, Cat } from 'lucide-react';

const RECEIVERS = [
    { name: "Aaron", initial: "A", color: "#FFB067" },
    { name: "Johnny", initial: "S", color: "#4C84FF" },
    { name: "Eliza", initial: "E", color: "#4CAF50" },
];

export default function QuickTransfer() {
    const { role, theme } = useDashboardStore();
    const [amount, setAmount] = useState(2455);
    const isDark = theme === 'dark';
    const accent = ACCENTS[role];

    const islandStyle = {
        background: isDark ? 'rgba(18, 18, 24, 0.92)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0px rgba(255,255,255,0.04) inset'
            : '0 4px 16px rgba(0,0,0,0.08), 0 1px 0px rgba(255,255,255,0.9) inset',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
    };

    const textColor = isDark ? '#fff' : '#0f172a';

    return (
        <div className="w-full flex flex-col gap-3 p-4 rounded-[2rem] transition-all duration-300" style={islandStyle}>
            <div className="flex items-center justify-between px-1">
                <div>
                    <h2 className="text-base font-bold tracking-tight" style={{ color: textColor }}>Quick Transfer</h2>
                    <p className="text-[9px] uppercase tracking-widest font-black opacity-30">Instant Payment</p>
                </div>
                <Settings size={14} className="opacity-20 hover:opacity-100 cursor-pointer" />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-3 border-r border-white/5 pr-3">
                    {RECEIVERS.map((person, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-md transition-all group-hover:scale-110" style={{ background: person.color }}>
                                {person.initial}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-500/20 flex items-center justify-center shrink-0 border border-white/10">
                            <Cat size={24} style={{ color: accent.hex }} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-black tracking-tight leading-tight" style={{ color: textColor }}>Varun Panchal</p>
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-lg font-bold">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-xl font-black focus:outline-none"
                            style={{ color: textColor }}
                        />
                    </div>
                </div>
            </div>

            {/* SLIDER */}
            <div className="px-1 mt-1">
                <div className="flex justify-between text-[10px] font-black uppercase opacity-40 mb-2">
                    <span>Limit</span>
                    <span style={{ color: accent.hex }}>Bal: ₹45.6L</span>
                </div>
                <div className="relative h-6 flex items-center">
                    <div className="absolute w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${(amount / 10000) * 100}%`, background: accent.gradient }} />
                    </div>
                    <input type="range" min="0" max="10000" value={amount} onChange={(e) => setAmount(e.target.value)} className="absolute w-full appearance-none bg-transparent cursor-pointer z-20 compact-slider" />
                    <div className="absolute pointer-events-none flex items-center justify-center w-7 h-7 rounded-full shadow-lg border border-white/20 z-10" style={{ left: `calc(${(amount / 10000) * 100}% - 14px)`, background: accent.hex }}>
                        <IndianRupee size={12} color="white" strokeWidth={4} />
                    </div>
                </div>
            </div>

            <button disabled={role === 'viewer'} className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-[2px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${role === 'viewer' ? 'opacity-30' : 'hover:brightness-110 shadow-lg'}`} style={{ background: accent.gradient, color: '#fff' }}>
                {role === 'viewer' ? 'READ ONLY' : 'SEND MONEY'}
                <ChevronRight size={16} />
            </button>

            <style jsx>{`
                .compact-slider::-webkit-slider-thumb { appearance: none; width: 28px; height: 28px; background: transparent; cursor: pointer; }
                .compact-slider::-moz-range-thumb { width: 28px; height: 28px; background: transparent; border: none; cursor: pointer; }
            `}</style>
        </div>
    );
}