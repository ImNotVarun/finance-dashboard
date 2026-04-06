import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getRevenueData, MOCK_HISTORY } from '../../data/mockTransactions';

export default function DashboardCharts({ isDark, accent }) {
    const trendData = getRevenueData('Monthly');

    // Group expenses by category for Pie Chart
    const categoryData = MOCK_HISTORY
        .filter(t => t.type === 'expense')
        .reduce((acc, curr) => {
            const existing = acc.find(item => item.name === curr.category);
            if (existing) existing.value += Math.abs(curr.amount);
            else acc.push({ name: curr.category, value: Math.abs(curr.amount) });
            return acc;
        }, []);

    const COLORS = [accent.hex, '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Balance Trend (Time-based) */}
            <div className={`p-6 rounded-[32px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                <h4 className="font-bold mb-6">Revenue vs Expenses</h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={accent.hex} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={accent.hex} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="label" strokeOpacity={0.5} fontSize={12} />
                            <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="revenue" stroke={accent.hex} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Spending Breakdown (Categorical) */}
            <div className={`p-6 rounded-[32px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'}`}>
                <h4 className="font-bold mb-6">Spending Breakdown</h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}