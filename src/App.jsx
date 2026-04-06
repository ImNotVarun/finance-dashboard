import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import IntroOverlay from './components/ui/IntroOverlay';
import { useDashboardStore, ACCENTS } from './store/useDashboardStore';

// Page Components
import BalanceCard from './components/dashboard/BalanceCard';
import Payments from './components/dashboard/Payments';
import Analytics from './components/dashboard/Analytics';
import Notifications from './components/dashboard/Notifications';
import SpendingsChart from './components/dashboard/Chart';
import RevenueExpensesChart from './components/dashboard/RevenueExpensesChart';
import StocksChart from './components/dashboard/StocksChart';
import SavingsTracker from './components/dashboard/SavingsTracker';
import QuickTransfer from './components/dashboard/QuickTransfer';
import Settings from './components/dashboard/Settings';

function App() {
  const { theme, role, setRole, page, setPage } = useDashboardStore();
  const [transition, setTransition] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.scrollTop = 0;
  }, [page]);

  const triggerRoleChange = (newRole) => {
    if (newRole === role) return;
    const direction = newRole === 'admin' ? 'right' : 'left';
    setTransition({ direction, role: newRole });
    setTimeout(() => setRole(newRole), 150);
    setTimeout(() => setTransition(null), 500);
  };

  const currentAccent = ACCENTS[role];
  const accent = transition ? ACCENTS[transition.role] : null;

  const background = theme === 'dark'
    ? `radial-gradient(1200px 600px at 80% -10%, rgba(${currentAccent.rgb},0.35), transparent),
         radial-gradient(1000px 500px at 0% 100%, rgba(${currentAccent.rgb},0.25), transparent), #0a0a0f`
    : `radial-gradient(1200px 600px at 80% -10%, rgba(${currentAccent.rgb},0.45), transparent),
         radial-gradient(1000px 500px at 0% 100%, rgba(${currentAccent.rgb},0.3), transparent), #f3f4f6`;

  const renderPage = () => {
    switch (page) {
      case 'payments': return <Payments />;
      case 'analytics': return <Analytics />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
      case 'dashboard':
      default:
        return (
          <div className="flex flex-col xl:flex-row items-start justify-center gap-6 xl:gap-3 w-full max-w-full mx-auto py-0 px-2 xl:px-4">

            {/* Left Column - Balance Card */}
            <div className="w-full xl:w-[30%] xl:sticky xl:top-9">
              <BalanceCard />
            </div>

            {/* Right Column - Charts */}
            <div className="w-full xl:w-[70%] flex flex-col gap-4 xl:gap-2">

              {/* Charts Row — stacked on mobile/tablet, row only on desktop */}
              <div className="flex flex-col xl:flex-row gap-4 xl:gap-3 items-start xl:ml-6 -mt-3">
                <div className="w-full xl:flex-1"><RevenueExpensesChart /></div>
                <div className="w-full xl:flex-1"><SpendingsChart /></div>
                <div className="w-full xl:flex-1 xl:min-w-[280px] xl:mt-6 xl:mr-9"><SavingsTracker /></div>
              </div>

              {/* Stocks + Quick Transfer — stacked on mobile/tablet, row only on desktop */}
              <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-3 xl:ml-6 xl:mr-9">
                <div className="w-full xl:w-[65%] xl:-mt-4"><StocksChart /></div>
                <div className="w-full xl:w-[35%] mt-0 xl:mt-[-80px] xl:ml-5"><QuickTransfer /></div>
              </div>

            </div>
          </div>
        );
    }
  };

  if (showIntro) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#0a0a0f]">
        <IntroOverlay
          theme={theme}
          accent={currentAccent}
          onFinish={() => setShowIntro(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 relative"
      style={{ background, color: theme === 'dark' ? '#fff' : '#0f172a' }}>

      <div className="fixed inset-0 backdrop-blur-[120px] pointer-events-none z-0" />

      {transition && (
        <div className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: `linear-gradient(270deg, rgba(${accent.rgb},0.0) 0%, rgba(${accent.rgb},0.6) 50%, rgba(${accent.rgb},1) 100%)`,
            animation: 'screen-sweep-left 0.5s ease forwards',
          }}
        />
      )}

      <Sidebar />

      <div className="relative z-10 flex flex-col flex-1 pb-28 xl:pb-0 xl:pl-28">
        <Topbar onRoleChange={triggerRoleChange} />
        <main className="flex-1 px-2 xl:px-4 pt-1 pb-2 overflow-y-auto overflow-x-hidden">
          <div key={page} className="page-anim w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;