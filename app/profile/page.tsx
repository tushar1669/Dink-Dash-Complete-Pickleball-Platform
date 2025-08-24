'use client';

import { useEffect, useState } from 'react';
import { User, Settings, Calendar, Trophy, Languages, Eye } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useI18n } from '@/lib/i18n';
import { useA11y } from '@/lib/a11y';
import { get, set } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';

type Skill = 'beginner' | 'intermediate' | 'advanced' | 'pro';
type City = 'delhi' | 'gurgaon' | 'noida' | 'faridabad' | 'ghaziabad';
type Lang = 'en' | 'hi';

type Profile = {
  name: string;
  email: string;
  phone: string;
  skillLevel: Skill;
  preferredTimes: string[]; // ✅ important: strings
  location: City;
};

const DEFAULT_PROFILE: Profile = {
  name: '',
  email: '',
  phone: '',
  skillLevel: 'beginner',
  preferredTimes: [],
  location: 'delhi',
};

const TIME_SLOTS: string[] = [
  'Early Morning (5-8 AM)',
  'Morning (8-12 PM)',
  'Afternoon (12-5 PM)',
  'Evening (5-9 PM)',
];

export default function ProfilePage() {
  const { t, language, setLanguage } = useI18n();
  const { seniorMode, setSeniorMode } = useA11y();

  // ✅ type the states so TS doesn’t infer never[]
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [bookings, setBookings] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    // Load profile data
    const savedProfile = get('profile', {}) as Partial<Profile>;
    setProfile((prev) => ({
      ...prev,
      ...savedProfile,
      preferredTimes: Array.isArray(savedProfile.preferredTimes)
        ? (savedProfile.preferredTimes as string[])
        : [],
      skillLevel: (savedProfile.skillLevel as Skill) ?? prev.skillLevel,
      location: (savedProfile.location as City) ?? prev.location,
    }));

    // Keep i18n language in sync if the profile had one
    const savedLang = (get('profile', {}) as any)?.language as Lang | undefined;
    if (savedLang === 'en' || savedLang === 'hi') setLanguage(savedLang);

    // Load bookings and registrations
    const allBookings = get('bookings', []) as any[];
    const allRegistrations = get('registrations', []) as any[];
    setBookings(allBookings);
    setRegistrations(allRegistrations);
  }, [setLanguage]);

  const saveProfile = () => {
    // Also persist the selected language alongside other fields
    set('profile', { ...profile, language });
    alert('Profile saved successfully!');
  };

  const handleProfileChange = <K extends keyof Profile>(field: K, value: Profile[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-8 text-3xl font-bold text-navy">
              {t('profile.title')}
            </h1>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Profile Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        type="tel"
                        placeholder="Enter your phone"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.skillLevel')}</label>
                      <Select
                        value={profile.skillLevel}
                        onChange={(e) =>
                          handleProfileChange('skillLevel', e.target.value as Skill)
                        }
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="pro">Pro</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <Select
                        value={profile.location}
                        onChange={(e) =>
                          handleProfileChange('location', e.target.value as City)
                        }
                      >
                        <option value="delhi">Delhi</option>
                        <option value="gurgaon">Gurgaon</option>
                        <option value="noida">Noida</option>
                        <option value="faridabad">Faridabad</option>
                        <option value="ghaziabad">Ghaziabad</option>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      Preferences & Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('profile.language')}</label>
                      <div className="flex space-x-4">
                        <Button
                          variant={language === 'en' ? 'primary' : 'outline'}
                          onClick={() => setLanguage('en')}
                          size="sm"
                        >
                          <Languages className="mr-2 h-4 w-4" />
                          English
                        </Button>
                        <Button
                          variant={language === 'hi' ? 'primary' : 'outline'}
                          onClick={() => setLanguage('hi')}
                          size="sm"
                        >
                          <Languages className="mr-2 h-4 w-4" />
                          हिन्दी
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={seniorMode}
                          onChange={(e) => setSeniorMode(e.target.checked)}
                          className="text-accent-500"
                        />
                        <Eye className="h-4 w-4" />
                        <span>{t('profile.seniorMode')} (Larger text and buttons)</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.preferredTimes')}</label>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {TIME_SLOTS.map((timeSlot) => {
                          const checked = profile.preferredTimes.includes(timeSlot);
                          return (
                            <label key={timeSlot} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleProfileChange('preferredTimes', [
                                      ...profile.preferredTimes,
                                      timeSlot,
                                    ]);
                                  } else {
                                    handleProfileChange(
                                      'preferredTimes',
                                      profile.preferredTimes.filter((t) => t !== timeSlot)
                                    );
                                  }
                                }}
                                className="text-accent-500"
                              />
                              <span>{timeSlot}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <Button onClick={saveProfile} className="w-full">
                      {t('common.save')} Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Summary */}
              <div className="space-y-6">
                {/* My Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      {t('profile.myBookings')} ({bookings.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings.length > 0 ? (
                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((booking: any) => (
                          <div key={booking.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-medium">{booking.venue.name}</div>
                            <div className="text-sm text-gray-600">
                              Court {booking.slots[0].courtNumber}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatDate(booking.slots[0].date)}
                            </div>
                            <div className="text-sm font-medium">
                              {formatCurrency(booking.total)}
                            </div>
                          </div>
                        ))}
                        {bookings.length > 3 && (
                          <div className="text-center text-sm text-gray-500">
                            +{bookings.length - 3} more bookings
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No bookings yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* My Tournament Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5" />
                      {t('profile.myRegistrations')} ({registrations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {registrations.length > 0 ? (
                      <div className="space-y-3">
                        {registrations.slice(0, 3).map((registration: any) => {
                          const events = get('events', []) as any[];
                          const ev = events.find((e: any) => e.id === registration.eventId);

                          return (
                            <div key={registration.id} className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-medium">{ev?.title || 'Tournament'}</div>
                              <div className="text-sm text-gray-600">
                                {ev ? formatDate(ev.date) : ''}
                              </div>
                              <div className="text-sm text-gray-600">
                                Skill: {registration.skillLevel}
                              </div>
                              {registration.partnerName && (
                                <div className="text-sm text-gray-600">
                                  Partner: {registration.partnerName}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {registrations.length > 3 && (
                          <div className="text-center text-sm text-gray-500">
                            +{registrations.length - 3} more registrations
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No registrations yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Bookings</span>
                        <span className="font-semibold">{bookings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tournament Entries</span>
                        <span className="font-semibold">{registrations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Spent</span>
                        <span className="font-semibold">
                          {formatCurrency(
                            bookings.reduce((sum: number, b: any) => sum + (b?.total ?? 0), 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
