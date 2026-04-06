import { Search, Sun, Moon, CreditCard } from 'lucide-react';
import RoleSwitcher from '../ui/RoleSwitcher';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';
import { useState } from 'react';

export default function Topbar({ onRoleChange }) {
    const { role, theme, toggleTheme, page, setPage } = useDashboardStore();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const accent = ACCENTS[role];

    const isDark = theme === 'dark';
    const isPaymentsPage = page === 'payments';

    const islandStyle = {
        background: isDark ? 'rgba(18, 18, 24, 0.88)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: isDark
            ? '0 8px 40px rgba(0,0,0,0.5), 0 1.5px 0px rgba(255,255,255,0.04) inset'
            : '0 4px 28px rgba(0,0,0,0.12), 0 1px 0px rgba(255,255,255,0.9) inset',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
        transition: 'all 0.3s ease',
    };

    const searchActiveStyle = isSearchFocused ? {
        border: `1px solid rgba(${accent.rgb}, 0.5)`,
        boxShadow: `0 0 0 1px rgba(${accent.rgb}, 0.2), ${islandStyle.boxShadow}`,
    } : {};

    const textColor = isDark ? '#fff' : '#0f172a';
    const iconColor = isDark ? '#64748b' : '#94a3b8';

    const buttonBg = isPaymentsPage
        ? accent.gradient
        : `linear-gradient(135deg, rgba(${accent.rgb},0.28) 0%, rgba(${accent.rgb},0.15) 100%)`;

    const buttonTextColor = isPaymentsPage ? '#fff' : accent.hex;

    return (
        <div className="sticky top-0 z-[100] w-full backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-6">

                {/* 1. Left Section: Search Island */}
                <div className="flex-1 flex justify-start">
                    <div
                        className="flex items-center gap-3 px-4 py-3 rounded-[2rem] w-full max-w-[320px] transition-all duration-300"
                        style={{ ...islandStyle, ...searchActiveStyle }}
                    >
                        <Search
                            size={18}
                            style={{
                                color: isSearchFocused ? accent.hex : iconColor,
                                flexShrink: 0,
                                transition: 'color 0.3s ease'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search... Currently in Maintenance"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className="bg-transparent w-full text-sm outline-none font-bold placeholder:font-medium placeholder:text-slate-500/60"
                            style={{ color: textColor }}
                        />
                    </div>
                </div>

                {/* 2. Center Section: Dynamic Welcome Message */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <h1 className="text-3xl font-bold tracking-tighter leading-none" style={{ color: textColor }}>
                        Welcome, <span className="opacity-50 capitalize">{role === 'admin' ? 'Admin :)' : 'Varun :)'}</span>
                    </h1>
                </div>

                {/* 3. Right Section: Controls */}
                <div className="flex-1 flex items-center justify-end gap-3">
                    <div className="flex items-center p-1.5 rounded-[2rem]" style={islandStyle}>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-10 h-10 rounded-[1.5rem] transition-all duration-200 active:scale-95"
                            style={{ background: `linear-gradient(135deg, rgba(${accent.rgb},0.2) 0%, rgba(${accent.rgb},0.1) 100%)`, color: accent.hex }}
                        >
                            {isDark ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center rounded-[2rem] p-1.5" style={islandStyle}>
                        <RoleSwitcher onRoleChange={onRoleChange} />
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-[2rem]" style={islandStyle}>
                        <button
                            onClick={() => setPage(isPaymentsPage ? 'dashboard' : 'payments')}
                            className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-[1.5rem] transition-all duration-300 active:scale-95"
                            style={{
                                background: buttonBg,
                                boxShadow: `0 0 0 1px rgba(${accent.rgb},0.5), 0 4px 16px rgba(${accent.rgb},0.2)`,
                                color: buttonTextColor
                            }}
                        >
                            <CreditCard size={16} className={isPaymentsPage ? 'animate-pulse' : ''} />
                            <span className="hidden md:inline">{isPaymentsPage ? 'Dashboard' : 'Upgrade'}</span>
                        </button>

                        <div
                            onClick={() => setPage('settings')}
                            className="w-9 h-9 rounded-2xl cursor-pointer flex items-center justify-center text-white text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-90"
                            style={{
                                background: accent.gradient,
                                boxShadow: `0 0 0 1px rgba(${accent.rgb},0.4), 0 4px 12px rgba(${accent.rgb},0.35)`
                            }}
                        >
                            {role === 'admin' ? 'A' : 'V'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] opacity-10" style={{ background: textColor }} />
        </div>
    );
}