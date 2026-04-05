import { useState } from 'react';
import { RiGithubFill, RiLinkedinFill, RiArrowRightLine, RiCheckLine } from '@remixicon/react';

export default function IntroOverlay({ onFinish, accent, theme }) {
    const [step, setStep] = useState(1);
    const [animating, setAnimating] = useState(false);

    const handleNext = () => setStep(2);

    const handleStart = () => {
        setAnimating(true);
        setTimeout(() => {
            onFinish();
        }, 550);
    };

    // The vibrant purple background used in the main dashboard
    const appBackground = theme === 'dark'
        ? 'radial-gradient(1200px 600px at 80% -10%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(1000px 500px at 0% 100%, rgba(139, 92, 246, 0.25), transparent), #0a0a0f'
        : 'radial-gradient(1200px 600px at 80% -10%, rgba(139, 92, 246, 0.45), transparent), radial-gradient(1000px 500px at 0% 100%, rgba(139, 92, 246, 0.3), transparent), #f3f4f6';

    // Refined Glassmorphism card styles
    const islandStyle = {
        background: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.03)' // Very subtle dark glass
            : 'rgba(255, 255, 255, 0.3)',  // Transparent light glass
        backdropFilter: 'blur(30px) saturate(180%)', // Increased blur and saturation for better glass effect
        WebkitBackdropFilter: 'blur(30px) saturate(180%)', // For Safari
        border: theme === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.2)', // Brighter border for glass definition
        boxShadow: theme === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.5)'
            : '0 20px 60px rgba(0, 0, 0, 0.15)',
    };

    return (
        // Added the Purple Background style to the parent container
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" style={{ background: appBackground }}>

            {/* Added the heavy backdrop blur layer behind the card, matching the dashboard */}
            <div className="fixed inset-0 backdrop-blur-[120px] pointer-events-none z-0" />

            {/* THE SWEEP ANIMATION */}
            {animating && (
                <div
                    className="fixed inset-0 z-[10000] pointer-events-none"
                    style={{
                        background: `linear-gradient(270deg, rgba(${accent.rgb},0.0) 0%, rgba(${accent.rgb},0.6) 50%, rgba(${accent.rgb},1) 100%)`,
                        animation: 'screen-sweep-left 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
                    }}
                />
            )}

            {/* DARK BACKDROP MASK (Fades when sweep starts) */}
            <div
                className="absolute inset-0 z-10 bg-black/30"
                style={{
                    opacity: animating ? 0 : 1,
                    transition: 'opacity 0.4s'
                }}
            />

            {/* GLASS CARD */}
            <div
                className="relative z-20 w-[340px] sm:w-[500px] rounded-[2.5rem] overflow-hidden transition-all duration-500"
                style={{
                    ...islandStyle,
                    color: theme === 'dark' ? '#fff' : '#0f172a',
                    opacity: animating ? 0 : 1,
                    transform: animating ? 'scale(0.9) translateY(20px)' : 'scale(1) translateY(0)',
                }}
            >
                {/* DYNAMIC IMAGE HEADER */}
                <div className="h-[180px] overflow-hidden relative">
                    <img
                        src={step === 1
                            ? "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
                            : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"}
                        alt="cover"
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                    {/* Glassy gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex gap-1 z-10">
                        <div className={`h-1.5 w-8 rounded-full transition-all ${step === 1 ? 'bg-white' : 'bg-white/40'}`} />
                        <div className={`h-1.5 w-8 rounded-full transition-all ${step === 2 ? 'bg-white' : 'bg-white/40'}`} />
                    </div>
                </div>

                <div className="p-8">
                    {step === 1 ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-3xl font-bold tracking-tight">Financial Freedom</h2>
                            <p className="text-base opacity-70 leading-relaxed">
                                Welcome to your new command center. Track every asset, liability, and "hidden" account in one slick interface.
                            </p>
                            <div className="flex items-center justify-between pt-6">
                                <div className={`flex gap-4 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                                    <RiGithubFill size={24} />
                                    <RiLinkedinFill size={24} />
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 h-[52px] font-bold active:scale-95 px-8 transition-all hover:gap-3"
                                    style={{ background: accent.gradient, color: '#fff', borderRadius: '1.25rem' }}
                                >
                                    Next Step <RiArrowRightLine size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-3xl font-bold tracking-tight">Ready to Audit?</h2>
                            <p className="text-base opacity-70 leading-relaxed">
                                Everything is set up. Your portfolio is syncing and the charts are ready for some "creative" accounting.
                            </p>
                            <div className="flex items-center justify-between pt-6">
                                <button onClick={() => setStep(1)} className={`text-sm font-medium ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'} hover:opacity-100`}>Back</button>
                                <button
                                    onClick={handleStart}
                                    className="flex items-center gap-2 h-[52px] font-bold active:scale-95 px-10 transition-transform"
                                    style={{
                                        background: accent.gradient,
                                        color: '#fff',
                                        borderRadius: '1.25rem',
                                        boxShadow: `0 8px 25px rgba(${accent.rgb},0.4)`
                                    }}
                                >
                                    Enter Dashboard <RiCheckLine size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}