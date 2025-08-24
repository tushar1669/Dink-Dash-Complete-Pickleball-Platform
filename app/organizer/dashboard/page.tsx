'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Users, MapPin, Calendar, Plus, TrendingUp, Eye } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import { get } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';

export default function OrganizerDashboard() {
  const { t } = useI18n();
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalEvents: 0,
    totalRegistrations: 0,
  });
  const [venues, setVenues] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    // Load data and calculate stats
    const allVenues = get('venues', []);
    const allBookings = get('bookings', []);
    const allEvents = get('events', []);
    const allRegistrations = get('registrations', []);

    // For demo purposes, we'll show all data
    // In a real app, this would be filtered by organizer
    const totalRevenue = allBookings.reduce((sum: number, booking: any) => sum + booking.total, 0);

    setStats({
      totalVenues: allVenues.length,
      totalBookings: allBookings.length,
      totalRevenue,
      totalEvents: allEvents.length,
      totalRegistrations: allRegistrations.length,
    });

    setVenues(allVenues.slice(0, 5)); // Show recent venues
    setEvents(allEvents.slice(0, 5)); // Show recent events
    setRecentBookings(allBookings.slice(-5).reverse()); // Show recent bookings
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-navy">
                Organizer Dashboard
              </h1>
              <Button asChild>
                <Link href="/organizer/venues/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Venue
                </Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Venues</p>
                      <p className="text-2xl font-bold text-navy">{stats.totalVenues}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-accent-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold text-navy">{stats.totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-navy">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Event Registrations</p>
                      <p className="text-2xl font-bold text-navy">{stats.totalRegistrations}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Recent Venues */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Venues</span>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/organizer/venues/new">Add New</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {venues.length > 0 ? (
                    <div className="space-y-3">
                      {venues.map((venue: any) => (
                        <div key={venue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{venue.name}</div>
                            <div className="text-sm text-gray-600">{venue.address}</div>
                            <div className="text-sm text-gray-600">{venue.courts} courts</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(venue.pricePerHour)}/hr</div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Eye className="h-3 w-3 mr-1" />
                              {venue.rating}/5
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No venues yet</p>
                      <Button asChild size="sm" className="mt-2">
                        <Link href="/organizer/venues/new">Add Your First Venue</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div className="space-y-3">
                      {recentBookings.map((booking: any) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{booking.venue.name}</div>
                            <div className="text-sm text-gray-600">
                              Court {booking.slots[0].courtNumber} • {booking.contactInfo.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(booking.slots[0].date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(booking.total)}</div>
                            <div className="text-sm text-green-600">Confirmed</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No bookings yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Events Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Your Events</span>
                    <Button variant="outline" size="sm" disabled>
                      {t('common.comingSoon')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {events.length > 0 ? (
                    <div className="space-y-3">
                      {events.slice(0, 3).map((event: any) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {event.currentParticipants}/{event.maxParticipants}
                            </div>
                            <div className="text-sm text-gray-600">participants</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No events yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link href="/organizer/venues/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Venue
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Event ({t('common.comingSoon')})
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/venues">
                      <Eye className="mr-2 h-4 w-4" />
                      View All Venues
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" disabled>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics ({t('common.comingSoon')})
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tips */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 bg-accent-50 rounded-lg">
                    <h4 className="font-semibold text-accent-700 mb-2">High-Quality Photos</h4>
                    <p className="text-sm text-accent-600">Add clear, well-lit photos of your courts to attract more bookings.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Competitive Pricing</h4>
                    <p className="text-sm text-blue-600">Research local rates and price your courts competitively.</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Respond Quickly</h4>
                    <p className="text-sm text-green-600">Fast responses to inquiries lead to more bookings.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}