// Mock data for Hot Deal items
// Structure for easy maintenance and future API integration

import { ImageSourcePropType } from 'react-native';
import { HotDealImages, MenuImages } from '@assets';

export interface HotDealItem {
  id: string;
  type: 'hero' | 'regular';
  label: string;
  title: string;
  description?: string;
  image: ImageSourcePropType;
  validUntil?: string;
  discount?: number;
}

export const hotDealsData: HotDealItem[] = [
  {
    id: 'hd-001',
    type: 'hero',
    label: 'CUSTOMER BENEFITS',
    title: "Accumulate with ",
    description: 'Earn points with every purchase and unlock exclusive rewards. Join our loyalty program today!',
    image: HotDealImages.lavuReward,
  },
  {
    id: 'hd-002',
    type: 'regular',
    label: 'CUSTOMER BENEFITS',
    title: "Lavu's Greatest Deal",
    description: 'Boxing Day Sale! Get amazing discounts on selected menu items. Limited time offer!',
    image: HotDealImages.deal01,
    validUntil: '2025-12-31',
    discount: 50,
  },
  {
    id: 'hd-003',
    type: 'regular',
    label: 'NEW FEATURES',
    title: "Lavu's Season Drink",
    description: 'Try our refreshing new seasonal drinks made with fresh, premium ingredients. Perfect for summer!',
    image: MenuImages.drink.drink5,
    validUntil: '2025-12-15',
  },
  {
    id: 'hd-004',
    type: 'regular',
    label: 'CUSTOMER BENEFITS',
    title: "Lavu's Special Deal",
    description: 'Unbelievable $1.00 special on selected items! Grab this limited-time offer while it lasts.',
    image: HotDealImages.deal01,
    validUntil: '2025-11-30',
    discount: 90,
  },
  {
    id: 'hd-005',
    type: 'regular',
    label: 'CUSTOMER BENEFITS',
    title: "Lavu's Happy Hour",
    description: 'Enjoy special pricing on drinks and appetizers every day from 4-6 PM. Bring your friends!',
    image: HotDealImages.happyHours,
  },
];

export const getHotDealById = (id: string): HotDealItem | undefined => {
  return hotDealsData.find(deal => deal.id === id);
};

export const getActiveDeals = (): HotDealItem[] => {
  const now = new Date();
  return hotDealsData.filter(deal => {
    if (!deal.validUntil) return true;
    return new Date(deal.validUntil) > now;
  });
};

export default hotDealsData;
