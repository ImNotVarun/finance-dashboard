import React, { useState, useEffect, useCallback } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Loader2, TrendingUp } from 'lucide-react';
import { fetchYahooStockData } from '../../data/mockTransactions';

export default function StocksChart() {
    const { theme } = useDashboardStore();
    const isDark = theme === 'dark';

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const loadMarketData = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        try {
            const [apple, ibm] = await Promise.all([
                fetchYahooStockData('AAPL'),
                fetchYahooStockData('IBM')
            ]);

            const combined = apple.map(aItem => {
                const ibmMatch = ibm.find(iItem => iItem.date === aItem.date);
                return {
                    date: aItem.date,
                    appleVal: aItem.value,
                    ibmVal: ibmMatch ? ibmMatch.value : null
                };
            }).filter(d => d.ibmVal !== null);

            setChartData(combined);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard sync failed:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMarketData();
        const interval = setInterval(() => loadMarketData(true), 300000);
        return () => clearInterval(interval);
    }, [loadMarketData]);

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    };

    const getMarketCap = () => {
        if (!chartData.length) return "0.00";
        const latest = chartData[chartData.length - 1].appleVal;
        return ((latest * 15.2) / 1000).toFixed(2);
    };

    return (
        <div className="w-full h-full p-0">
            <div className="flex flex-col relative rounded-[40px] overflow-hidden transition-all duration-500"
                style={{
                    background: isDark ? '#121218' : '#FFFFFF',
                    boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 25px rgba(0,0,0,0.05)',
                    minHeight: '280px'
                }}>

                <div className="px-8 pt-6 pb-1 flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                                Apple & IBM
                            </h2>
                            <div className="bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-500 uppercase">Yahoo Live API</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-2xl font-black tracking-tighter" style={{ color: isDark ? '#fff' : '#1a1a1a' }}>
                            ${getMarketCap()}T
                        </h2>
                        <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-end gap-1">
                            <TrendingUp size={10} className="text-emerald-500" />
                            Estimated Cap
                        </span>
                    </div>
                </div>

                <div className="flex-grow w-full px-4 mt-2 flex items-center justify-center">
                    {loading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="animate-spin text-blue-500" size={24} />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Fetching Yahoo Data...</span>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={160} debounce={100}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradApple" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradIBM" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeOpacity={isDark ? 0.05 : 0.1} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatDate}
                                    tick={{ fontSize: 9, fill: '#94a3b8' }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval={Math.floor(chartData.length / 5)}
                                />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: isDark ? '#1e1e26' : '#fff' }}
                                    labelFormatter={formatDate}
                                />

                                {/* ANIMATED AREAS */}
                                <Area
                                    type="monotone"
                                    dataKey="ibmVal"
                                    stroke="#3b82f6"
                                    fill="url(#gradIBM)"
                                    strokeWidth={2}
                                    isAnimationActive={true}
                                    animationDuration={2500}
                                    animationEasing="ease-in-out"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="appleVal"
                                    stroke="#f43f5e"
                                    fill="url(#gradApple)"
                                    strokeWidth={3}
                                    isAnimationActive={true}
                                    animationBegin={300}
                                    animationDuration={2000}
                                    animationEasing="ease-out"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="px-8 pb-4">
                    <p className="text-[8px] text-slate-500 italic">
                        Synced: {lastUpdated.toLocaleTimeString()} via CORS Proxy
                    </p>
                </div>
            </div>
        </div>
    );
}