import { Home, BadgeIndianRupee, BarChart3, Bell, Settings } from 'lucide-react';
import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';

const navItems = [
    { icon: Home, id: 'home' },
    { icon: BarChart3, id: 'analytics' },
    { icon: BadgeIndianRupee, id: 'payments' },
    { icon: Bell, id: 'notifications' },
];

export default function Sidebar() {
    const { role, theme, page, setPage } = useDashboardStore();
    const active = page;
    const accent = ACCENTS[role];

    const islandStyle = {
        background: theme === 'dark'
            ? 'rgba(18, 18, 24, 0.88)'
            : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme === 'dark'
            ? '0 8px 40px rgba(0,0,0,0.5), 0 1.5px 0px rgba(255,255,255,0.04) inset'
            : '0 4px 28px rgba(0,0,0,0.12), 0 1px 0px rgba(255,255,255,0.9) inset',
        border: theme === 'dark'
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.07)',
    };

    const activeStyle = {
        background: `linear-gradient(135deg, rgba(${accent.rgb},0.35) 0%, rgba(${accent.rgb},0.20) 100%)`,
        boxShadow: `0 0 0 1px rgba(${accent.rgb},0.5), 0 4px 18px rgba(${accent.rgb},0.28)`,
    };

    const renderBtn = (id, Icon) => {
        const isActive = active === id;

        return (
            <button
                key={id}
                onClick={() => setPage(id)}
                className="relative flex items-center justify-center rounded-3xl transition-all duration-200 group
                           w-14 h-14 lg:w-[3.5rem] lg:h-[3.5rem]"
                style={isActive ? activeStyle : {}}
            >
                {isActive && (
                    <span
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(${accent.rgb},0.18) 0%, transparent 70%)`,
                        }}
                    />
                )}

                <Icon
                    size={26}
                    style={{
                        color: isActive ? accent.hex : theme === 'dark' ? '#64748b' : '#94a3b8',
                        filter: isActive ? `drop-shadow(0 0 7px rgba(${accent.rgb},0.75))` : 'none',
                        transition: 'all 0.2s ease',
                    }}
                />
            </button>
        );
    };

    return (
        <>
            {/*  Desktop sidebar */}
            <div className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
                <div className="flex flex-col items-center gap-2 py-4 px-3 rounded-[2.5rem]" style={islandStyle}>
                    {navItems.map(({ icon: Icon, id }) => renderBtn(id, Icon))}
                </div>
                <div className="flex flex-col items-center py-4 px-3 rounded-[2.5rem]" style={islandStyle}>
                    {renderBtn('settings', Settings)}
                </div>
            </div>

            {/* Bottom nav*/}
            <div
                className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                           flex items-center gap-2 px-4 py-3 rounded-[2.5rem]"
                style={islandStyle}
            >
                {[...navItems, { icon: Settings, id: 'settings' }].map(({ icon: Icon, id }) =>
                    renderBtn(id, Icon)
                )}
            </div>
        </>
    );
}