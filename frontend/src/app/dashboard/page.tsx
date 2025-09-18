'use client';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AuthProvider } from '../../contexts/AuthContext';
import AppWrapper from '../AppWrapper';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  SignalIcon, 
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

function DashboardContent() {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    subscriptions: [],
    active_signals: [],
    recent_trades: [],
    performance: {
      total_pnl: 0,
      win_rate: 0,
      total_trades: 0,
    },
  });

  useEffect(() => {
    // TODO: Fetch actual dashboard data from API
    // For now, using mock data
    setDashboardData({
      user: null,
      subscriptions: [],
      active_signals: [
        {
          id: 1,
          name: 'EUR/USD Breakout',
          symbol: 'EURUSD',
          status: 'active',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Gold Trend Follow',
          symbol: 'XAUUSD',
          status: 'active',
          created_at: new Date().toISOString(),
        },
      ],
      recent_trades: [
        {
          id: 1,
          symbol: 'EURUSD',
          side: 'BUY',
          lot: 0.1,
          entry_price: 1.0850,
          status: 'closed',
          pnl: 45.50,
          opened_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 2,
          symbol: 'XAUUSD',
          side: 'SELL',
          lot: 0.05,
          entry_price: 2015.30,
          status: 'open',
          pnl: -12.75,
          opened_at: new Date(Date.now() - 1800000).toISOString(),
        },
      ],
      performance: {
        total_pnl: 1250.75,
        win_rate: 68.5,
        total_trades: 47,
      },
    });
  }, []);

  const stats = [
    {
      name: 'Total P&L',
      value: `$${dashboardData.performance.total_pnl.toFixed(2)}`,
      icon: CurrencyDollarIcon,
      color: dashboardData.performance.total_pnl >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: dashboardData.performance.total_pnl >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20',
    },
    {
      name: 'Win Rate',
      value: `${dashboardData.performance.win_rate.toFixed(1)}%`,
      icon: TrendingUpIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      name: 'Active Signals',
      value: dashboardData.active_signals.length.toString(),
      icon: SignalIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      name: 'Total Trades',
      value: dashboardData.performance.total_trades.toString(),
      icon: ChartBarIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-dark-800 shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to your Trading Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Monitor your signals, trades, and performance in real-time.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-dark-800 shadow-sm rounded-lg p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Signals */}
          <div className="bg-white dark:bg-dark-800 shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Signals
              </h2>
            </div>
            <div className="p-6">
              {dashboardData.active_signals.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.active_signals.map((signal: any) => (
                    <div key={signal.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {signal.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {signal.symbol}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <SignalIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No active signals. Subscribe to signal providers to get started.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-white dark:bg-dark-800 shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Trades
              </h2>
            </div>
            <div className="p-6">
              {dashboardData.recent_trades.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recent_trades.map((trade: any) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {trade.symbol} - {trade.side}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {trade.lot} lots @ {trade.entry_price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${trade.pnl.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {new Date(trade.opened_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No trades yet. Start receiving signals to see your trading activity.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MT5 Connection Status */}
        <div className="bg-white dark:bg-dark-800 shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            MT5 Connection Status
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Setup Required:</strong> Install the HyperS EA on your MT5 terminal to start receiving signals.
              </p>
            </div>
            <button className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Download EA & Setup Instructions
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function DashboardPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppWrapper>
          <DashboardContent />
        </AppWrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}