'use client';

import { Users, UserPlus, MessageCircle, Calendar, MapPin, Trophy } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

const comingSoonFeatures = [
  {
    icon: UserPlus,
    title: 'Find Players',
    description: 'Connect with players of similar skill levels in your area',
    comingSoon: true,
  },
  {
    icon: Users,
    title: 'Join Clubs',
    description: 'Discover and join local pickleball clubs and communities',
    comingSoon: true,
  },
  {
    icon: MessageCircle,
    title: 'Community Feed',
    description: 'Share experiences, tips, and connect with fellow players',
    comingSoon: true,
  },
  {
    icon: Calendar,
    title: 'Pickup Games',
    description: 'Organize and join casual pickup games in your neighborhood',
    comingSoon: true,
  },
  {
    icon: Trophy,
    title: 'Leaderboards',
    description: 'Track your progress and compete on local leaderboards',
    comingSoon: true,
  },
  {
    icon: MapPin,
    title: 'Local Events',
    description: 'Discover community events, workshops, and social gatherings',
    comingSoon: true,
  },
];

export default function CommunityPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-8 text-3xl font-bold text-navy">
              {t('nav.community')}
            </h1>

            {/* Coming Soon Banner */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-100 rounded-full mb-4">
                <Users className="h-10 w-10 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4">
                Community Features {t('common.comingSoon')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're building amazing community features to help you connect with fellow pickleball enthusiasts. 
                Stay tuned for updates!
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-accent-600" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Coming Soon
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <Button variant="outline" disabled className="w-full">
                        {t('common.comingSoon')}
                      </Button>
                    </CardContent>
                    
                    {/* Overlay to indicate coming soon */}
                    <div className="absolute inset-0 bg-white/50 pointer-events-none"></div>
                  </Card>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-12">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-navy mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to know when our community features launch. 
                  We'll notify you about new ways to connect and play!
                </p>
                <div className="flex max-w-md mx-auto space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                  <Button>
                    Notify Me
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Temporary Links to Other Features */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-navy mb-4">
                While You Wait, Explore Our Current Features
              </h3>
              <div className="flex justify-center space-x-4">
                <Button asChild variant="primary">
                  <a href="/venues">Book Courts</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/tournaments">Join Tournaments</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/catalog">Shop Gear</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}