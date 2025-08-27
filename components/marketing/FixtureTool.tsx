'use client';

import { useState } from 'react';
import { Calendar, Users, Trophy, Bell } from 'lucide-react';

export default function FixtureTool() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setNotified(true);
      setEmail('');
      setTimeout(() => setNotified(false), 3000);
    }
  };

  return (
    <section id="fixture-tool" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4 mr-2" />
            Coming Soon
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fixture Tool
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize tournaments, manage brackets, and schedule matches with our comprehensive fixture management system.
          </p>
        </div>

        {/* Feature Preview */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">
              Automatically generate match schedules that work for all participants and venues.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Player Management</h3>
            <p className="text-gray-600">
              Track player availability, skill levels, and preferences for optimal matchmaking.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tournament Brackets</h3>
            <p className="text-gray-600">
              Create and manage various tournament formats with real-time bracket updates.
            </p>
          </div>
        </div>

        {/* Notify Me Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <Bell className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Be the First to Know
              </h3>
              <p className="text-gray-600">
                Get notified when our Fixture Tool launches with early access.
              </p>
            </div>

            <form onSubmit={handleNotifyMe} className="space-y-4">
              <div>
                <label htmlFor="fixture-email" className="sr-only">
                  Email address for fixture tool notifications
                </label>
                <input
                  id="fixture-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  aria-describedby="fixture-email-help"
                />
                <p id="fixture-email-help" className="text-sm text-gray-500 mt-1">
                  We'll send you an email when the Fixture Tool is ready.
                </p>
              </div>

              <button
                type="submit"
                disabled={notified}
                className="w-full btn-primary px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {notified ? 'Thanks! We\'ll notify you.' : 'Notify Me'}
              </button>
            </form>

            {notified && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm text-center">
                  ✓ You'll be notified when the Fixture Tool launches!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}