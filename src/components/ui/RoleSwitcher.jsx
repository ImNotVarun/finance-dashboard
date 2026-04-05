import { useDashboardStore, ACCENTS } from '../../store/useDashboardStore';

export default function RoleSwitcher({ onRoleChange }) {
    const { role } = useDashboardStore();

    return (
        <div className="flex gap-1">
            {['viewer', 'admin'].map((r) => {
                const isActive = role === r;
                const accent = ACCENTS[r];

                return (
                    <button
                        key={r}
                        onClick={() => onRoleChange(r)} // ✅ FIXED
                        className="px-5 py-2.5 rounded-[1.5rem] text-sm font-medium transition-all duration-200 capitalize active:scale-95"
                        style={isActive ? {
                            background: `linear-gradient(135deg, rgba(${accent.rgb},0.28), rgba(${accent.rgb},0.15))`,
                            boxShadow: `0 0 0 1px rgba(${accent.rgb},0.5), 0 4px 16px rgba(${accent.rgb},0.2)`,
                            color: accent.hex,
                        } : {
                            color: '#64748b',
                        }}
                    >
                        {r}
                    </button>
                );
            })}
        </div>
    );
}