'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n';
import { get, set } from '@/lib/storage';
import { formatCurrency, formatTime } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [booking, setBooking] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const pendingBooking = get('pendingBooking');
    if (!pendingBooking) {
      router.push('/venues');
      return;
    }
    setBooking(pendingBooking);
  }, [router]);

  const handleConfirmBooking = async () => {
    if (!contactInfo.name || !contactInfo.phone) {
      alert('Please fill in required fields');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create booking record
    const bookingId = `PB${Date.now()}`;
    const bookingRecord = {
      id: bookingId,
      ...booking,
      contactInfo,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save booking
    const bookings = get('bookings', []);
    bookings.push(bookingRecord);
    set('bookings', bookings);

    // Update slot status to booked
    const allSlots = get('slots', []);
    const updatedSlots = allSlots.map((slot: any) => {
      if (booking.slots.find((s: any) => s.id === slot.id)) {
        return { ...slot, status: 'booked', bookedBy: bookingId };
      }
      return slot;
    });
    set('slots', updatedSlots);

    // Clear pending booking
    set('pendingBooking', null);

    // Redirect to success
    router.push(`/booking-success?id=${bookingId}`);
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
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Venue
            </Button>

            <h1 className="mb-8 text-3xl font-bold text-navy">
              {t('checkout.title')}
            </h1>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Booking Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Venue & Slots */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('checkout.bookingDetails')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold">{booking.venue.name}</h4>
                      <p className="text-sm text-gray-600">{booking.venue.address}</p>
                    </div>
                    
                    <div className="space-y-2">
                      {booking.slots.map((slot: any) => (
                        <div key={slot.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <span className="font-medium">Court {slot.courtNumber}</span>
                            <span className="ml-2 text-gray-600">
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(slot.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="font-semibold">{formatCurrency(slot.price)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('checkout.contactInfo')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name *
                      </label>
                      <Input
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <Input
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        type="tel"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email (Optional)
                      </label>
                      <Input
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('checkout.paymentMethod')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-accent-500"
                        />
                        <Smartphone className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">{t('checkout.upi')}</div>
                          <div className="text-sm text-gray-600">Pay with UPI apps</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-accent-500"
                        />
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">{t('checkout.card')}</div>
                          <div className="text-sm text-gray-600">Credit or Debit Card</div>
                        </div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Slots ({booking.slots.length})</span>
                        <span>{formatCurrency(booking.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Platform Fee</span>
                        <span>₹0</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>{t('checkout.total')}</span>
                        <span>{formatCurrency(booking.total)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleConfirmBooking}
                      disabled={processing || !contactInfo.name || !contactInfo.phone}
                      className="w-full"
                      size="lg"
                    >
                      {processing ? 'Processing...' : t('checkout.confirmBooking')}
                    </Button>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                      By booking, you agree to our terms and conditions.
                    </p>
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