'use client';

import { useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n';

export default function AuthPage() {
  const { t } = useI18n();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                  <Lock className="h-8 w-8 text-accent-600" />
                </div>
                <CardTitle className="text-2xl text-navy">
                  {t('common.comingSoon')}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Authentication features are coming soon!
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Mock Login Form */}
                <div className="space-y-4 opacity-50 pointer-events-none">
                  <div className="flex space-x-2">
                    <Button
                      variant={isLogin ? "primary" : "outline"}
                      onClick={() => setIsLogin(true)}
                      className="flex-1"
                      disabled
                    >
                      Login
                    </Button>
                    <Button
                      variant={!isLogin ? "primary" : "outline"}
                      onClick={() => setIsLogin(false)}
                      className="flex-1"
                      disabled
                    >
                      Sign Up
                    </Button>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                          className="pl-9"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        type="email"
                        placeholder="your@email.com"
                        className="pl-9"
                        disabled
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        type="tel"
                        placeholder="Your phone number"
                        disabled
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pl-9 pr-9"
                        disabled
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400"
                        disabled
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          type="password"
                          placeholder="Confirm password"
                          className="pl-9"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  <Button disabled className="w-full">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>

                  {isLogin && (
                    <div className="text-center">
                      <button className="text-sm text-accent-600 hover:text-accent-700" disabled>
                        Forgot your password?
                      </button>
                    </div>
                  )}
                </div>

                {/* Coming Soon Message */}
                <div className="text-center p-6 bg-accent-50 rounded-lg">
                  <h3 className="font-semibold text-accent-700 mb-2">
                    Full Authentication Coming Soon!
                  </h3>
                  <p className="text-sm text-accent-600 mb-4">
                    We're working on secure user accounts, social login, and personalized experiences.
                  </p>
                  <div className="text-xs text-accent-500">
                    Features in development:
                  </div>
                  <div className="text-xs text-accent-600 mt-1 space-y-1">
                    <div>• Secure email/phone authentication</div>
                    <div>• Social login (Google, Facebook)</div>
                    <div>• Player profiles and statistics</div>
                    <div>• Booking history and preferences</div>
                  </div>
                </div>

                {/* Temporary Access */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    For now, you can use all features without creating an account.
                    Your data will be saved locally on your device.
                  </p>
                  <Button asChild>
                    <a href="/">Continue Without Account</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}