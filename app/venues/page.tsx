'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, Star, Clock, Users } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { BallRally } from '@/components/ui/loader/BallRally';
import { useI18n } from '@/lib/i18n';
import { get } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function VenuesPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState<any[]>([]);
const [cities, setCities] = useState<any[]>([]);
const [filteredVenues, setFilteredVenues] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    priceRange: '',
  });

  useEffect(() => {
    const loadData = () => {
      const venuesData = get('venues', []);
      const citiesData = get('cities', []);
      setVenues(venuesData);
      setCities(citiesData);
      setFilteredVenues(venuesData);
      setLoading(false);
    };

    // Small delay to show loading state
    setTimeout(loadData, 500);
  }, []);

  useEffect(() => {
    let filtered = venues.filter((venue: any) => {
      const matchesSearch = venue.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          venue.address.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCity = !filters.city || venue.cityId === filters.city;
      const matchesPrice = !filters.priceRange || 
        (filters.priceRange === 'low' && venue.pricePerHour <= 500) ||
        (filters.priceRange === 'medium' && venue.pricePerHour > 500 && venue.pricePerHour <= 800) ||
        (filters.priceRange === 'high' && venue.pricePerHour > 800);
      
      return matchesSearch && matchesCity && matchesPrice;
    });
    
    setFilteredVenues(filtered);
  }, [venues, filters]);

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
                {t('venues.title')}
              </h1>
              
              {/* Search and Filters */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('venues.searchPlaceholder')}
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
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                >
                  <option value="">{t('venues.filters.priceRange')}</option>
                  <option value="low">Under ₹500</option>
                  <option value="medium">₹500 - ₹800</option>
                  <option value="high">Above ₹800</option>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-gray-600">
              {filteredVenues.length} venues found
            </div>

            {/* Venues Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVenues.map((venue: any) => (
                <Card key={venue.id} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 h-48 bg-gray-200 rounded-md flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <CardTitle className="flex items-start justify-between">
                      <span>{venue.name}</span>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{venue.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        {venue.address}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {venue.courts} {t('venues.courts')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {venue.openHours}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {venue.amenities.slice(0, 3).map((amenity: string) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {venue.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{venue.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-navy">
                        {formatCurrency(venue.pricePerHour)}
                        <span className="text-sm font-normal text-gray-600">
                          /{t('venues.perHour')}
                        </span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/venue/${venue.id}`}>
                          {t('common.book')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVenues.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No venues match your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}