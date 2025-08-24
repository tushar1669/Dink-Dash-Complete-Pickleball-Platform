'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Clock, Users, Wifi, Car, Coffee, Dumbbell } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BallRally } from '@/components/ui/loader/BallRally';
import { useI18n } from '@/lib/i18n';
import { get, set } from '@/lib/storage';
import { formatCurrency, formatTime } from '@/lib/utils';

const amenityIcons: Record<string, any> = {
  parking: Car,
  wifi: Wifi,
  cafe: Coffee,
  locker: Dumbbell,
  shower: Dumbbell,
  equipment: Dumbbell,
};

export default function VenueDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [venue, setVenue] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const venues = get('venues', []);
      const foundVenue = venues.find((v: any) => v.id === params.id);
      
      if (!foundVenue) {
        router.push('/venues');
        return;
      }
      
      setVenue(foundVenue);
      
      // Generate date options (next 7 days)
      const today = new Date();
      const dateOptions = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dateOptions.push(date.toISOString().split('T')[0]);
      }
      
      setSelectedDate(dateOptions[0]);
      loadSlots(foundVenue.id, dateOptions[0]);
      setLoading(false);
    };

    setTimeout(loadData, 300);
  }, [params.id, router]);

  const loadSlots = (venueId: string, date: string) => {
    const allSlots = get('slots', []);
    const venueSlots = allSlots.filter((slot: any) => 
      slot.venueId === venueId && slot.date === date
    );
    setSlots(venueSlots);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlots([]);
    loadSlots(venue.id, date);
  };

  const handleSlotToggle = (slot: any) => {
    if (slot.status !== 'available') return;
    
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.id === slot.id);
      if (exists) {
        return prev.filter(s => s.id !== slot.id);
      } else {
        return [...prev, slot];
      }
    });
  };

  const proceedToCheckout = () => {
    if (selectedSlots.length === 0) return;
    
    // Hold selected slots temporarily
    const allSlots = get('slots', []);
    const updatedSlots = allSlots.map((slot: any) => {
      if (selectedSlots.find(s => s.id === slot.id)) {
        return { ...slot, status: 'held' };
      }
      return slot;
    });
    set('slots', updatedSlots);
    
    // Save booking session
    set('pendingBooking', {
      venue,
      slots: selectedSlots,
      total: selectedSlots.reduce((sum, slot) => sum + slot.price, 0),
    });
    
    router.push('/checkout');
  };

  const getSlotStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-red-100 text-red-800 border-red-200';
      case 'held': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading || !venue) {
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

  // Group slots by court and time
  const groupedSlots = slots.reduce((acc: any, slot: any) => {
    const key = `${slot.courtNumber}-${slot.startTime}`;
    if (!acc[key]) {
      acc[key] = slot;
    }
    return acc;
  }, {});

  const timeSlots = [...new Set(slots.map((slot: any) => slot.startTime))].sort();
  const courts = [...new Set(slots.map((slot: any) => slot.courtNumber))].sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Venues
            </Button>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Venue Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="mb-4 h-48 bg-gray-200 rounded-md flex items-center justify-center">
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
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {venue.address}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {venue.courts} {t('venues.courts')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {venue.openHours}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities.map((amenity: string) => {
                          const Icon = amenityIcons[amenity];
                          return (
                            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                              {Icon && <Icon className="h-3 w-3" />}
                              {amenity}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-2xl font-semibold text-navy">
                      {formatCurrency(venue.pricePerHour)}
                      <span className="text-base font-normal text-gray-600">
                        /{t('venues.perHour')}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      {venue.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Interface */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Book a Slot</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Date Selector */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Select Date</h4>
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 7 }, (_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() + i);
                          const dateStr = date.toISOString().split('T')[0];
                          const isSelected = selectedDate === dateStr;
                          
                          return (
                            <button
                              key={dateStr}
                              onClick={() => handleDateChange(dateStr)}
                              className={`p-3 rounded-lg text-center transition-colors ${
                                isSelected
                                  ? 'bg-accent-500 text-navy'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <div className="text-xs">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                              <div className="font-semibold">{date.getDate()}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Slot Grid */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Available Slots</h4>
                      {timeSlots.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No slots available for this date</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-left py-2">Time</th>
                                {courts.map(court => (
                                  <th key={court} className="text-center py-2 px-2">
                                    Court {court}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {timeSlots.map(time => (
                                <tr key={time}>
                                  <td className="py-2 font-medium">{formatTime(time)}</td>
                                  {courts.map(court => {
                                    const slot = groupedSlots[`${court}-${time}`];
                                    if (!slot) {
                                      return <td key={court} className="p-2"></td>;
                                    }
                                    
                                    const isSelected = selectedSlots.find(s => s.id === slot.id);
                                    const isAvailable = slot.status === 'available';
                                    
                                    return (
                                      <td key={court} className="p-2">
                                        <button
                                          onClick={() => handleSlotToggle(slot)}
                                          disabled={!isAvailable}
                                          className={`w-full p-3 rounded-lg border text-xs font-medium transition-colors ${
                                            isSelected
                                              ? 'bg-accent-500 text-navy border-accent-600'
                                              : isAvailable
                                              ? 'bg-white hover:bg-gray-50 border-gray-300'
                                              : getSlotStatusColor(slot.status)
                                          }`}
                                        >
                                          {isAvailable ? (
                                            <div>
                                              <div>{formatCurrency(slot.price)}</div>
                                              <div className="text-green-600">Available</div>
                                            </div>
                                          ) : (
                                            <div>{slot.status}</div>
                                          )}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Selected Slots Summary */}
                    {selectedSlots.length > 0 && (
                      <div className="mb-6 p-4 bg-accent-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Selected Slots</h4>
                        {selectedSlots.map(slot => (
                          <div key={slot.id} className="flex justify-between items-center text-sm">
                            <span>Court {slot.courtNumber} - {formatTime(slot.startTime)}-{formatTime(slot.endTime)}</span>
                            <span>{formatCurrency(slot.price)}</span>
                          </div>
                        ))}
                        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatCurrency(selectedSlots.reduce((sum, slot) => sum + slot.price, 0))}</span>
                        </div>
                      </div>
                    )}

                    {/* Book Button */}
                    <Button
                      onClick={proceedToCheckout}
                      disabled={selectedSlots.length === 0}
                      className="w-full"
                      size="lg"
                    >
                      {selectedSlots.length === 0 
                        ? t('venues.selectSlot')
                        : t('venues.proceedToCheckout')
                      }
                    </Button>
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