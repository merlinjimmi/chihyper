'use client';
import Link from 'next/link';
import { ChartBarIcon, ShieldCheckIcon, CogIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-900 dark:to-dark-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">HyperS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional
            <span className="text-primary-600 dark:text-primary-400"> MT5 Trading </span>
            Signal Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with expert traders, receive real-time signals, and execute trades automatically 
            on your MT5 account with institutional-grade security and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose HyperS?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built for serious traders who demand performance, security, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Signals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive and execute trading signals in real-time with millisecond precision.
              </p>
            </div>

            <div className="text-center p-6">
              <ShieldCheckIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Bank-level Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                HMAC-signed signals, encrypted connections, and comprehensive audit logs.
              </p>
            </div>

            <div className="text-center p-6">
              <CogIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Risk Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced risk controls with customizable position sizing and limits.
              </p>
            </div>

            <div className="text-center p-6">
              <GlobeAltIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Global Brokers
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compatible with any MT5 broker worldwide through our lightweight EA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of traders already using HyperS to enhance their trading performance.
          </p>
          <Link
            href="/auth/signup"
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">HyperS Trading Platform</h3>
          <p className="text-gray-400 mb-4">
            Professional MT5 signal distribution with institutional-grade security.
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 HyperS Trading Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}