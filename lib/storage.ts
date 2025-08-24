const NAMESPACE = 'picklebay_';

export function get(key: string, fallback: any = null): any {
  try {
    const item = localStorage.getItem(NAMESPACE + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function set(key: string, value: any): void {
  try {
    localStorage.setItem(NAMESPACE + key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function seedOnce(): void {
  const seeded = get('seeded', false);
  if (seeded) return;

  // Import and seed all data
  Promise.all([
    import('@/data/cities.json'),
    import('@/data/venues.json'),
    import('@/data/slots.json'),
    import('@/data/events.json'),
    import('@/data/products.json'),
  ]).then(([cities, venues, slots, events, products]) => {
    set('cities', cities.default);
    set('venues', venues.default);
    set('slots', slots.default);
    set('events', events.default);
    set('products', products.default);
    set('bookings', []);
    set('registrations', []);
    set('seeded', true);
  }).catch(error => {
    console.warn('Failed to seed data:', error);
  });
}