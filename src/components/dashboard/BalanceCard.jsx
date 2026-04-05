import { useState } from 'react';
import { MOCK_HISTORY, mockCards, mockSubscriptions } from '../../data/mockTransactions';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { Plus, Wifi, Pencil, History as HistoryIcon, CreditCard, ArrowUpRight } from 'lucide-react';

export default function BalanceCard() {
    const [cards, setCards] = useState(mockCards || []);
    const [transactions] = useState(MOCK_HISTORY || []);
    const [subs] = useState(mockSubscriptions || []);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const { role, theme, setPage } = useDashboardStore();
    const accent = ACCENTS[role];
    const isDark = theme === 'dark';

    const totalBalance = transactions.length > 0
        ? transactions.reduce((sum, t) => sum + (t.amount || 0), 0)
        : 0;

    const handleCardClick = (index) => {
        if (index === 0 || cards.length === 0) return;
        const newCards = [...cards];
        const clicked = newCards.splice(index, 1)[0];
        newCards.unshift(clicked);
        setCards(newCards);
        setHoveredIndex(null);
    };

    function CardContent({ card, shadow }) {
        const getGradient = (tailwindClasses) => {
            const colors = {
                'orange-500': '#f97316', 'red-600': '#dc2626', 'amber-700': '#b45309',
                'slate-700': '#334155', 'slate-800': '#1e293b', 'slate-900': '#0f172a',
                'indigo-900': '#312e81', 'black': '#000000', 'lime-400': '#a3e635',
                'fuchsia-600': '#c026d3', 'purple-700': '#7e22ce', 'indigo-800': '#3730a3',
            };
            const parts = tailwindClasses.split(' ');
            const from = colors[parts[0]?.replace('from-', '')] || '#3b82f6';
            const via = parts[1]?.includes('via-') ? colors[parts[1].replace('via-', '')] : null;
            const to = colors[parts[parts.length - 1]?.replace('to-', '')] || '#1d4ed8';
            return via ? `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)` : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
        };

        return (
            <div className={`w-full h-full p-6 flex flex-col justify-between relative rounded-[28px] overflow-hidden transition-all duration-300 ${shadow ? 'shadow-2xl' : 'shadow-lg'}`} style={{ background: getGradient(card.color) }}>
                <h1 className="absolute inset-0 flex items-center justify-center text-[110px] font-black italic select-none pointer-events-none opacity-[0.08] tracking-tighter uppercase text-white leading-none">{card.bgText}</h1>
                <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="text-white/60 font-bold text-[10px] uppercase tracking-[2px]">{card.bank}</div>
                        <div className="text-white font-bold text-lg mt-1 drop-shadow-md">{card.type}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="text-white/60 font-black text-xl italic tracking-tighter uppercase leading-none">{card.type.includes('UPI') ? 'UPI' : 'RuPay'}</div>
                        <div className="rotate-90 text-white/80"><Wifi size={20} strokeWidth={2.5} /></div>
                    </div>
                </div>
                <div className="relative z-10 flex items-center gap-6 mt-2">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1 shrink-0 shadow-2xl border border-white/10">
                        <img src={card.qr} alt="qr" className="w-20 h-20 sm:w-24 sm:h-24 object-contain contrast-115 rounded-xl" />
                    </div>
                    <div className="overflow-hidden text-white">
                        {card.upi ? <div className="text-2xl font-bold tracking-tight drop-shadow-lg">{card.upi}</div> : <><div className="text-2xl font-mono tracking-[3px] drop-shadow-lg">{card.number}</div><div className="text-white/80 text-[11px] font-bold uppercase mt-1 tracking-widest">Exp: {card.expiry}</div></>}
                    </div>
                </div>
                <div className="relative z-10 text-white/90 text-[11px] font-black italic uppercase tracking-tighter drop-shadow-sm">{card.type.includes('UPI') ? 'Instant Pay' : 'Platinum Class'}</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
            <div className="relative rounded-[32px] overflow-visible pb-8 sm:pb-12" style={{ background: isDark ? '#121218' : '#ffffff', boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.6)' : '0 10px 25px rgba(0,0,0,0.12)' }}>
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <div>
                        <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight">My cards</h2>
                        <p className="text-xs sm:text-sm text-slate-400">{cards.length} cards active</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition active:scale-95 shadow-lg" style={{ background: accent.hex, color: '#fff' }}>
                        <Plus size={18} /> Add
                    </button>
                </div>

                {/* Cards Section */}
                <div className="relative">
                    {cards.length > 0 ? (
                        <>
                            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-6 pb-6">
                                {cards.map((card) => (<div key={card.id} className="min-w-[85%] sm:min-w-[320px] snap-center aspect-[1.6/1]"><CardContent card={card} isDark={isDark} /></div>))}
                            </div>
                            <div className="hidden lg:block px-6 pb-40">
                                <div className="relative mx-auto w-full h-[220px]" style={{ maxWidth: '350px', transform: 'translateX(-35px)' }}>
                                    {cards.map((card, index) => (
                                        <div key={card.id} onClick={() => handleCardClick(index)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="absolute left-0 top-0 w-full h-[200px] transition-all duration-500 cursor-pointer" style={{ transformOrigin: 'left center', transform: `translateX(${index === 0 ? 0 : index * 48}px) scale(${index === 0 ? 1 : 1 - index * 0.05}) rotate(${hoveredIndex === index && index !== 0 ? -15 : 0}deg)`, zIndex: cards.length - index }}><CardContent card={card} isDark={isDark} shadow={index === 0} /></div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mx-6 mb-40 h-[200px] rounded-[28px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center opacity-30 gap-2"><CreditCard size={40} /><p className="font-bold uppercase tracking-widest text-xs">No cards linked</p></div>
                    )}
                </div>

                {/* Bottom Floating Info Card */}
                <div className="relative lg:absolute left-0 right-0 z-50 px-2 sm:px-0 mt-4 lg:mt-0 lg:top-[250px]">
                    <div
                        className="rounded-[24px] sm:rounded-3xl backdrop-blur-xl p-4 sm:p-6 shadow-xl border"
                        style={{
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
                        }}>
                        <div className="text-center mb-6">
                            <p className="text-xs sm:text-sm text-slate-400 mb-1 font-medium uppercase tracking-[1px]">Total Balance</p>
                            {(() => {
                                const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(totalBalance);
                                const [main, decimal] = formatted.split('.');
                                return (
                                    <p className="text-3xl sm:text-5xl font-semibold tracking-tight" style={{ color: accent.hex, filter: `drop-shadow(0 0 12px rgba(${accent.rgb}, 0.7))` }}>{main}<span className="text-[0.6em] opacity-60">.{decimal}</span></p>
                                );
                            })()}
                        </div>

                        {/* SUBSCRIPTION SECTION */}
                        <div className="flex items-center justify-between mt-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    {subs.length > 0 ? subs.map((sub, i) => (
                                        <div key={sub.id} className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 shadow-md bg-white overflow-hidden" style={{ marginLeft: i === 0 ? 0 : '-12px', zIndex: subs.length - i }}>
                                            <img src={sub.icon} alt={sub.name} className="w-7 h-7 object-contain" />
                                        </div>
                                    )) : <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">No active subs</div>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[1px] opacity-40 leading-none">Subscriptions</span>
                                    <span className="text-[9px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                        {subs.length} Active
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setPage('notifications')}
                                className="text-[10px] px-4 py-2 rounded-full transition hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 font-black uppercase tracking-widest flex items-center gap-2"
                                style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                            >
                                Manage <ArrowUpRight size={12} />
                            </button>
                        </div>

                        {/* RECENT TRANSACTIONS TITLE */}
                        <div className="flex items-center justify-between mb-4 px-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[11px] font-black uppercase tracking-[2px] opacity-50">Recent Transactions</h3>
                                <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold opacity-40">
                                    {transactions.length}
                                </div>
                            </div>
                        </div>

                        {/* Transactions List */}
                        <div className="space-y-3">
                            {transactions.length > 0 ? transactions.slice(0, 3).map((tx) => (
                                <div key={tx.id} className="group flex items-center justify-between rounded-2xl p-4 transition-all hover:translate-x-1" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm shrink-0"><img src={tx.logo} className="w-full h-full object-contain" /></div>
                                        <div>
                                            <div className="font-bold text-sm tracking-tight">{tx.name}</div>
                                            <div className="text-[10px] text-slate-400 font-medium">{tx.date.split(',')[0]}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`font-mono text-base font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                        </div>
                                        {role === 'admin' && (
                                            <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                                <Pencil size={14} className={isDark ? 'text-white' : 'text-slate-600'} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="py-8 flex flex-col items-center justify-center opacity-30 border border-dashed border-white/10 rounded-[24px]"><HistoryIcon size={18} /><p className="text-[10px] font-bold uppercase tracking-widest mt-2">No Recent Activity</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}