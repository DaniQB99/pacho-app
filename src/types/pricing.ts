export interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  periodKey: string;
  featuresKeys: string[];
  isPopular?: boolean;
  isComingSoon?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    nameKey: 'pricing.freeTier',
    priceKey: 'pricing.freePrice',
    periodKey: 'pricing.freePeriod',
    featuresKeys: [
      'pricing.freeFeatures.0',
      'pricing.freeFeatures.1',
      'pricing.freeFeatures.2',
      'pricing.freeFeatures.3',
    ],
    isPopular: false,
  },
  {
    id: 'pro',
    nameKey: 'pricing.proTier',
    priceKey: 'pricing.proPrice',
    periodKey: 'pricing.proPeriod',
    featuresKeys: [
      'pricing.proFeatures.0',
      'pricing.proFeatures.1',
      'pricing.proFeatures.2',
      'pricing.proFeatures.3',
    ],
    isPopular: true,
    isComingSoon: true,
  },
];
