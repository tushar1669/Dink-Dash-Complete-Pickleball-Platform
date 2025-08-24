export interface PricingTier {
  name: string;
  pricePerHour: number;
  features: string[];
}

export function calculateSlotPrice(basePrice: number, duration: number, isPeakHour: boolean = false): number {
  let price = basePrice * duration;
  if (isPeakHour) {
    price *= 1.5; // 50% surge for peak hours
  }
  return Math.round(price);
}

export function calculateTournamentFee(baseFee: number, skillLevel: string, early: boolean = false): number {
  let fee = baseFee;
  
  if (skillLevel === 'pro') {
    fee *= 2;
  } else if (skillLevel === 'advanced') {
    fee *= 1.5;
  }
  
  if (early) {
    fee *= 0.8; // 20% early bird discount
  }
  
  return Math.round(fee);
}