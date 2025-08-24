'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, MapPin, Users, Trophy, Star } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { BallRally } from '@/components/ui/loader/BallRally';
import { useI18n } from '@/lib/i18n';
import { get } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function TournamentsPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    skillLevel: '',
  });

  useEffect(() => {
    const loadData = () => {
      const eventsData = get('events', []);
      const citiesData = get('cities', []);
      setEvents(eventsData);
      setCities(citiesData);
      setFilteredEvents(eventsData);
      setLoading(false);
    };

    setTimeout(loadData, 500);
  }, []);

  useEffect(() => {
    let filtered = events.filter((event: any) => {
      const matchesSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          event.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCity = !filters.city || event.cityId === filters.city;
      const matchesSkillLevel = !filters.skillLevel || event.skillLevel === filters.skillLevel;
      
      return matchesSearch && matchesCity && matchesSkillLevel;
    });
    
    setFilteredEvents(filtered);
  }, [events, filters]);

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isRegistrationOpen = (event: any) => {
    const deadline = new Date(event.registrationDeadline);
    const now = new Date();
    return now <= deadline && event.currentParticipants < event.maxParticipants;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pb-20 md:pb-8 md:pl-64">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <BallRally />
              <p className="mt-4 text-gray-600">{t('common.loading')}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-bold text-navy">
                {t('tournaments.title')}
              </h1>
              
              {/* Search and Filters */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('tournaments.searchPlaceholder')}
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-9"
                  />
                </div>
                
                <Select
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                >
                  <option value="">{t('venues.filters.city')}</option>
                  {cities.map((city: any) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
                
                <Select
                  value={filters.skillLevel}
                  onChange={(e) => setFilters(prev => ({ ...prev, skillLevel: e.target.value }))}
                >
                  <option value="">{t('tournaments.filters.level')}</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="pro">Pro</option>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-600">
              {filteredEvents.length} tournaments found
            </div>

            {/* Tournaments Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event: any) => {
                const registrationOpen = isRegistrationOpen(event);
                const city = cities.find((c: any) => c.id === event.cityId);
                
                return (
                  <Card key={event.id} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getSkillLevelColor(event.skillLevel)}>
                          {event.skillLevel}
                        </Badge>
                        {registrationOpen && (
                          <Badge variant="success" className="text-xs">
                            {t('tournaments.registrationOpen')}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(event.date)}
                            {event.endDate && event.endDate !== event.date && (
                              <span> - {formatDate(event.endDate)}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {city?.name}
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {event.currentParticipants}/{event.maxParticipants} participants
                          </div>
                          
                          <div className="flex items-center">
                            <Trophy className="h-4 w-4 mr-2" />
                            {t('tournaments.entryFee')}: {formatCurrency(event.entryFee)}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>

                        {event.prizes && event.prizes.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-1">Prize Pool</h4>
                            <div className="flex items-center space-x-2 text-xs">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span>{event.prizes.slice(0, 3).join(' • ')}</span>
                            </div>
                          </div>
                        )}

                        <div className="text-xs text-gray-500 mb-4">
                          Registration deadline: {formatDate(event.registrationDeadline)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-navy">
                          {formatCurrency(event.entryFee)}
                        </div>
                        <Button asChild size="sm" disabled={!registrationOpen}>
                          <Link href={`/event/${event.id}`}>
                            {registrationOpen ? t('common.register') : 'Full'}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No tournaments match your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}