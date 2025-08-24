'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Star, DollarSign } from 'lucide-react';
import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { BallRally } from '@/components/ui/loader/BallRally';
import { useI18n } from '@/lib/i18n';
import { get, set } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/utils';
import { generateSingleEliminationBracket } from '@/lib/matchmaking';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);
  const [venue, setVenue] = useState<any>(null);
  const [city, setCity] = useState<any>(null);

  // ✅ Type these arrays so TS doesn’t infer never[]
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [bracket, setBracket] = useState<any[]>([]);

  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    phone: '',
    email: '',
    skillLevel: 'beginner',
    partnerName: '',
  });
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const events = get('events', []);
      const venues = get('venues', []);
      const cities = get('cities', []);
      const allRegistrations = get('registrations', []);
      
      const foundEvent = events.find((e: any) => e.id === params.id);
      if (!foundEvent) {
        router.push('/tournaments');
        return;
      }
      
      const eventVenue = venues.find((v: any) => v.id === foundEvent.venueId);
      const eventCity = cities.find((c: any) => c.id === foundEvent.cityId);
      const eventRegistrations = allRegistrations.filter((r: any) => r.eventId === params.id);
      
      setEvent(foundEvent);
      setVenue(eventVenue);
      setCity(eventCity);
      setRegistrations(eventRegistrations);
      
      // Generate bracket if there are enough participants
      if (eventRegistrations.length >= 4) {
        const players = eventRegistrations.map((reg: any) => ({
          id: reg.id,
          name: reg.name,
          skillLevel: reg.skillLevel,
        }));
        const generatedBracket = generateSingleEliminationBracket(players);
        setBracket(generatedBracket as any[]); // structure comes from your lib
      }
      
      setLoading(false);
    };

    setTimeout(loadData, 300);
  }, [params.id, router]);

  const isRegistrationOpen = () => {
    if (!event) return false;
    const deadline = new Date(event.registrationDeadline);
    const now = new Date();
    return now <= deadline && registrations.length < event.maxParticipants;
  };

  const handleRegistration = async () => {
    if (!registrationForm.name || !registrationForm.phone) {
      alert('Please fill in required fields');
      return;
    }

    // Check if already registered
    const existingReg = registrations.find((r: any) => 
      r.phone === registrationForm.phone || r.email === registrationForm.email
    );
    
    if (existingReg) {
      alert('You are already registered for this tournament');
      return;
    }

    setRegistering(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create registration record
    const registrationId = `REG${Date.now()}`;
    const registration = {
      id: registrationId,
      eventId: event.id,
      ...registrationForm,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save registration
    const allRegistrations = get('registrations', []);
    allRegistrations.push(registration);
    set('registrations', allRegistrations);

    // Update local state
    const updatedRegistrations = [...registrations, registration];
    setRegistrations(updatedRegistrations);

    // Regenerate bracket if needed
    if (updatedRegistrations.length >= 4) {
      const players = updatedRegistrations.map((reg: any) => ({
        id: reg.id,
        name: reg.name,
        skillLevel: reg.skillLevel,
      }));
      setBracket(generateSingleEliminationBracket(players) as any[]);
    }

    setRegistering(false);
    alert('Registration successful!');
    setRegistrationForm({
      name: '',
      phone: '',
      email: '',
      skillLevel: 'beginner',
      partnerName: '',
    });
  };

  if (loading || !event) {
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

  const registrationOpen = isRegistrationOpen();

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
              Back to Tournaments
            </Button>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Event Details */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={`${event.skillLevel === 'beginner' ? 'bg-green-100 text-green-800' :
                        event.skillLevel === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        event.skillLevel === 'advanced' ? 'bg-red-100 text-red-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                        {event.skillLevel}
                      </Badge>
                      {registrationOpen && (
                        <Badge variant="success">
                          {t('tournaments.registrationOpen')}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid gap-4 mb-6 md:grid-cols-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-3" />
                        <div>
                          <div className="font-medium">Date</div>
                          <div className="text-sm">
                            {formatDate(event.date)}
                            {event.endDate && event.endDate !== event.date && (
                              <span> - {formatDate(event.endDate)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm">
                            {venue?.name}, {city?.name}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-3" />
                        <div>
                          <div className="font-medium">Participants</div>
                          <div className="text-sm">
                            {registrations.length}/{event.maxParticipants}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-5 w-5 mr-3" />
                        <div>
                          <div className="font-medium">Entry Fee</div>
                          <div className="text-sm">
                            {formatCurrency(event.entryFee)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>

                    {event.prizes && event.prizes.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2 flex items-center">
                          <Trophy className="h-4 w-4 mr-2" />
                          Prize Pool
                        </h3>
                        <div className="grid gap-2 md:grid-cols-3">
                          {event.prizes.map((prize: string, index: number) => (
                            <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                              <div>
                                <div className="text-xs text-gray-600">
                                  {index === 0 ? '1st Place' : index === 1 ? '2nd Place' : '3rd Place'}
                                </div>
                                <div className="font-semibold">{prize}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-gray-500">
                      Registration deadline: {formatDate(event.registrationDeadline)}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Organized by: {event.organizer} • Contact: {event.contact}
                    </div>
                  </CardContent>
                </Card>

                {/* Participants List */}
                {registrations.length > 0 && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Registered Participants ({registrations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        {registrations.map((reg: any, index) => (
                          <div key={reg.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{reg.name}</div>
                              {reg.partnerName && (
                                <div className="text-sm text-gray-600">Partner: {reg.partnerName}</div>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {reg.skillLevel}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tournament Bracket */}
                {bracket.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('tournaments.bracket')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <div className="flex space-x-8 min-w-max">
                          {bracket.map((round: any, roundIndex: number) => (
                            <div key={roundIndex} className="flex flex-col space-y-4 min-w-48">
                              <h4 className="font-semibold text-center">
                                {roundIndex === bracket.length - 1 ? 'Final' :
                                 roundIndex === bracket.length - 2 ? 'Semifinal' :
                                 `Round ${roundIndex + 1}`}
                              </h4>
                              {round.map((match: any, matchIndex: number) => (
                                <div key={match.id} className="border rounded-lg p-3 bg-white">
                                  <div className="text-xs text-gray-500 mb-1">Match {matchIndex + 1}</div>
                                  <div className="space-y-1">
                                    <div className={`text-sm p-1 rounded ${match.player1 && match.player1.name !== 'BYE' ? 'bg-gray-50' : 'bg-gray-100 text-gray-500'}`}>
                                      {match.player1 ? match.player1.name : 'TBD'}
                                    </div>
                                    <div className="text-xs text-center text-gray-400">vs</div>
                                    <div className={`text-sm p-1 rounded ${match.player2 && match.player2.name !== 'BYE' ? 'bg-gray-50' : 'bg-gray-100 text-gray-500'}`}>
                                      {match.player2 ? match.player2.name : 'TBD'}
                                    </div>
                                  </div>
                                  {match.winner && (
                                    <div className="mt-2 text-xs text-center font-medium text-green-600">
                                      Winner: {match.winner.name}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Registration Form */}
              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>
                      {registrationOpen ? 'Register Now' : 'Registration Closed'}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {registrationOpen ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name *</label>
                          <Input
                            value={registrationForm.name}
                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone *</label>
                          <Input
                            value={registrationForm.phone}
                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Your phone number"
                            type="tel"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <Input
                            value={registrationForm.email}
                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Your email"
                            type="email"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Skill Level</label>
                          <Select
                            value={registrationForm.skillLevel}
                            onChange={(e) => setRegistrationForm(prev => ({ ...prev, skillLevel: e.target.value }))}
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="pro">Pro</option>
                          </Select>
                        </div>
                        
                        {event.format === 'double-elimination' && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Partner Name</label>
                            <Input
                              value={registrationForm.partnerName}
                              onChange={(e) => setRegistrationForm(prev => ({ ...prev, partnerName: e.target.value }))}
                              placeholder="Your partner's name"
                            />
                          </div>
                        )}

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Entry Fee</span>
                            <span className="text-xl font-bold">{formatCurrency(event.entryFee)}</span>
                          </div>
                        </div>

                        <Button
                          onClick={handleRegistration}
                          disabled={registering || !registrationForm.name || !registrationForm.phone}
                          className="w-full"
                          size="lg"
                        >
                          {registering ? 'Registering...' : t('common.register')}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">
                          {registrations.length >= event.maxParticipants
                            ? 'Tournament is full'
                            : 'Registration period has ended'
                          }
                        </p>
                        <div className="text-2xl font-bold text-navy">
                          {formatCurrency(event.entryFee)}
                        </div>
                      </div>
                    )}
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
