'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useI18n } from '@/lib/i18n';
import { get, set } from '@/lib/storage';

const AMENITY_OPTIONS = [
  { value: 'parking', label: 'Parking' },
  { value: 'locker', label: 'Lockers' },
  { value: 'shower', label: 'Showers' },
  { value: 'cafe', label: 'Cafe' },
  { value: 'equipment', label: 'Equipment Rental' },
  { value: 'coaching', label: 'Coaching Available' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'valet', label: 'Valet Parking' },
];

export default function NewVenuePage() {
  const router = useRouter();
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [venueData, setVenueData] = useState({
    name: '',
    nameHi: '',
    address: '',
    cityId: 'delhi',
    courts: 1,
    pricePerHour: 500,
    amenities: [] as string[],
    description: '',
    phone: '',
    openHours: '06:00-22:00',
  });

  const cities = get('cities', []);

  const handleInputChange = (field: string, value: any) => {
    setVenueData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setVenueData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const generateTimeSlots = (venueId: string) => {
    const slots = [];
    const today = new Date();
    
    // Generate slots for next 30 days
    for (let day = 0; day < 30; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate hourly slots from 6 AM to 10 PM for each court
      for (let court = 1; court <= venueData.courts; court++) {
        for (let hour = 6; hour < 22; hour++) {
          const startTime = `${hour.toString().padStart(2, '0')}:00`;
          const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
          
          slots.push({
            id: `slot-${venueId}-${court}-${dateStr}-${startTime}`,
            venueId,
            courtNumber: court,
            date: dateStr,
            startTime,
            endTime,
            status: 'available',
            price: venueData.pricePerHour,
          });
        }
      }
    }
    
    return slots;
  };

  const handleSubmit = () => {
    if (!venueData.name || !venueData.address) {
      alert('Please fill in required fields');
      return;
    }

    // Create venue ID
    const venueId = `venue-${Date.now()}`;
    
    // Create venue object
    const venue = {
      id: venueId,
      ...venueData,
      rating: 4.0, // Default rating for new venues
      image: '/api/placeholder/400/300',
      createdAt: new Date().toISOString(),
      organizer: 'Self-Service', // In a real app, this would be the current user
    };

    // Add venue to storage
    const venues = get('venues', []);
    venues.push(venue);
    set('venues', venues);

    // Generate and add slots
    const newSlots = generateTimeSlots(venueId);
    const existingSlots = get('slots', []);
    set('slots', [...existingSlots, ...newSlots]);

    alert('Venue created successfully!');
    router.push('/organizer/dashboard');
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!venueData.name || !venueData.address) {
        alert('Please fill in required fields');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-3xl">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <h1 className="mb-8 text-3xl font-bold text-navy">
              Add New Venue
            </h1>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-accent-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-accent-500 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium">Basic Info</span>
                </div>
                
                <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-accent-500' : 'bg-gray-200'}`}></div>
                
                <div className={`flex items-center ${currentStep >= 2 ? 'text-accent-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-accent-500 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium">Details</span>
                </div>
                
                <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-accent-500' : 'bg-gray-200'}`}></div>
                
                <div className={`flex items-center ${currentStep >= 3 ? 'text-accent-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-accent-500 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 font-medium">Review</span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <CardHeader className="p-0">
                      <CardTitle className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Venue Name *</label>
                        <Input
                          value={venueData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter venue name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Hindi Name</label>
                        <Input
                          value={venueData.nameHi}
                          onChange={(e) => handleInputChange('nameHi', e.target.value)}
                          placeholder="हिंदी में नाम"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Full Address *</label>
                      <Input
                        value={venueData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter complete address"
                        required
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <Select
                          value={venueData.cityId}
                          onChange={(e) => handleInputChange('cityId', e.target.value)}
                        >
                          {cities.map((city: any) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <Input
                          value={venueData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Contact number"
                          type="tel"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <CardHeader className="p-0">
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Venue Details
                      </CardTitle>
                    </CardHeader>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Number of Courts</label>
                        <Select
                          value={venueData.courts.toString()}
                          onChange={(e) => handleInputChange('courts', parseInt(e.target.value))}
                        >
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Price per Hour (₹)</label>
                        <Input
                          value={venueData.pricePerHour}
                          onChange={(e) => handleInputChange('pricePerHour', parseInt(e.target.value) || 0)}
                          type="number"
                          min="100"
                          step="50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Operating Hours</label>
                        <Input
                          value={venueData.openHours}
                          onChange={(e) => handleInputChange('openHours', e.target.value)}
                          placeholder="06:00-22:00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Amenities</label>
                      <div className="grid gap-2 md:grid-cols-3">
                        {AMENITY_OPTIONS.map((amenity) => (
                          <label key={amenity.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={venueData.amenities.includes(amenity.value)}
                              onChange={() => handleAmenityToggle(amenity.value)}
                              className="text-accent-500"
                            />
                            <span className="text-sm">{amenity.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={venueData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your venue (facilities, atmosphere, etc.)"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <CardHeader className="p-0">
                      <CardTitle>Review Your Venue</CardTitle>
                    </CardHeader>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{venueData.name}</h3>
                      {venueData.nameHi && (
                        <p className="text-gray-600 mb-2">{venueData.nameHi}</p>
                      )}
                      <p className="text-gray-600 mb-2">{venueData.address}</p>
                      <div className="grid gap-4 md:grid-cols-2 text-sm">
                        <div>
                          <span className="font-medium">City:</span> {cities.find((c: any) => c.id === venueData.cityId)?.name}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {venueData.phone || 'Not provided'}
                        </div>
                        <div>
                          <span className="font-medium">Courts:</span> {venueData.courts}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span> ₹{venueData.pricePerHour}/hour
                        </div>
                        <div>
                          <span className="font-medium">Hours:</span> {venueData.openHours}
                        </div>
                      </div>
                      
                      {venueData.amenities.length > 0 && (
                        <div className="mt-3">
                          <span className="font-medium">Amenities:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {venueData.amenities.map(amenity => (
                              <span key={amenity} className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded">
                                {AMENITY_OPTIONS.find(a => a.value === amenity)?.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {venueData.description && (
                        <div className="mt-3">
                          <span className="font-medium">Description:</span>
                          <p className="text-gray-600 mt-1">{venueData.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-accent-50 p-4 rounded-lg">
                      <h4 className="font-medium text-accent-700 mb-2">What happens next?</h4>
                      <ul className="text-sm text-accent-600 space-y-1">
                        <li>• Your venue will be immediately available for bookings</li>
                        <li>• We'll generate time slots for the next 30 days</li>
                        <li>• Users can discover and book your courts</li>
                        <li>• You can manage bookings from your dashboard</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <Button onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                        Create Venue
                      </Button>
                    )}
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