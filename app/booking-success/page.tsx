'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import { get } from '@/lib/storage';
import { formatCurrency, formatTime, generateCalendarFile } from '@/lib/utils';

type Slot = {
  id: string;
  date: string;        // "2025-08-21"
  startTime: string;   // "07:00"
  endTime: string;     // "08:00"
  courtNumber: number;
  price: number;
};

type Booking = {
  id: string;
  total: number;
  contactInfo: { name: string; phone: string; email?: string };
  venue: { name: string; address: string; phone?: string };
  slots: Slot[];
};

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useI18n();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // 1) read booking id from URL
    const bookingId = searchParams.get('id');
    if (!bookingId) {
      router.push('/venues');
      return;
    }
    // 2) read all bookings from storage and find this one
    const bookings = get('bookings', []) as Booking[];
    const foundBooking = bookings.find((b) => b.id === bookingId);
    if (!foundBooking) {
      router.push('/venues');
      return;
    }
    setBooking(foundBooking);
  }, [searchParams, router]);

  const handleAddToCalendar = () => {
    if (!booking || booking.slots.length === 0) return;

    const first = booking.slots[0];
    const last = booking.slots[booking.slots.length - 1];

    // Build ISO-ish datetimes (IST +05:30). This is good enough for a mock ICS.
    const startISO = `${first.date}T${first.startTime}:00+05:30`;
    const endISO = `${last.date}T${last.endTime}:00+05:30`;

    generateCalendarFile(
      {
        title: `Pickleball Court ${first.courtNumber} @ ${booking.venue.name}`,
        start: startISO,
        end: endISO,
        description: `Booking ID: ${booking.id}\nTotal: ${formatCurrency(
          booking.total
        )}\nVenue: ${booking.venue.name}\nAddress: ${booking.venue.address}`,
        location: booking.venue.address,
      },
      `pickleball-booking-${booking.id}.ics`
    );
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pb-20 md:pb-8 md:pl-64">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
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
          <div className="mx-auto max-w-2xl">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-navy mb-2">
                {t('success.bookingConfirmed')}
              </h1>
              <p className="text-gray-600">
                Your pickleball court has been successfully booked!
              </p>
            </div>

            {/* Booking Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Booking Details
                  <span className="text-sm font-normal text-gray-600">
                    {t('success.bookingReference')}: {booking.id}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{booking.venue.name}</h4>
                    <p className="text-sm text-gray-600">{booking.venue.address}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Booked Slots</h4>
                    {booking.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <span className="font-medium">Court {slot.courtNumber}</span>
                          <span className="ml-2 text-gray-600">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </span>
                          <div className="text-sm text-gray-500">
                            {new Date(slot.date).toLocaleDateString('en-IN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <span className="font-semibold">{formatCurrency(slot.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">Total Paid</span>
                    <span className="text-xl font-bold text-navy">
                      {formatCurrency(booking.total)}
                    </span>
                  </div>

                  <div className="bg-accent-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="text-sm space-y-1">
                      <div>Name: {booking.contactInfo.name}</div>
                      <div>Phone: {booking.contactInfo.phone}</div>
                      {booking.contactInfo.email && (
                        <div>Email: {booking.contactInfo.email}</div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-4">
              <Button onClick={handleAddToCalendar} variant="outline" className="w-full" size="lg">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {t('success.addToCalendar')}
              </Button>

              <div className="grid gap-4 md:grid-cols-2">
                <Button onClick={() => router.push('/profile')} variant="secondary" className="w-full">
                  View My Bookings
                </Button>

                <Button onClick={() => router.push('/venues')} className="w-full">
                  Book Another Court
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Important Notes */}
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">Important Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Please arrive 10 minutes before your scheduled time</p>
                  <p>• Bring your own equipment or rent from the venue</p>
                  <p>• Contact the venue directly for any changes or cancellations</p>
                  <p>• Venue Contact: {booking.venue.phone ?? 'NA'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
