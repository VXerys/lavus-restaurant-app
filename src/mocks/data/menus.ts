import { MenuItem } from '@types';

export const menus: MenuItem[] = [
  {
    id: 'm-001',
    name: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan ayam suwir, udang, telur, dan kerupuk',
    price: 38000,
    category: 'main',
    image: 'https://picsum.photos/seed/nasgor/400/300',
    isRecommended: true,
    isAvailable: true,
    spicyLevel: 1,
    createdAt: '2025-11-01T09:00:00.000Z',
    updatedAt: '2025-11-05T10:30:00.000Z'
  },
  {
    id: 'm-002',
    name: 'Mie Ayam Jamur',
    description: 'Mie ayam khas dengan topping jamur merang dan daun bawang',
    price: 32000,
    category: 'main',
    image: 'https://picsum.photos/seed/mieayam/400/300',
    isRecommended: false,
    isAvailable: true,
    spicyLevel: 0,
    createdAt: '2025-11-01T09:10:00.000Z',
    updatedAt: '2025-11-05T10:30:00.000Z'
  },
  {
    id: 'm-003',
    name: 'Es Teh Manis',
    description: 'Teh melati dingin dengan gula tebu cair',
    price: 8000,
    category: 'beverage',
    image: 'https://picsum.photos/seed/esteh/400/300',
    isRecommended: false,
    isAvailable: true,
    spicyLevel: 0,
    createdAt: '2025-11-01T09:15:00.000Z',
    updatedAt: '2025-11-05T10:30:00.000Z'
  },
  {
    id: 'm-004',
    name: 'Lava Brownies',
    description: 'Brownies coklat hangat dengan saus lava dan es krim vanilla',
    price: 27000,
    category: 'dessert',
    image: 'https://picsum.photos/seed/brownies/400/300',
    isRecommended: true,
    isAvailable: true,
    spicyLevel: 0,
    createdAt: '2025-11-01T09:20:00.000Z',
    updatedAt: '2025-11-05T10:30:00.000Z'
  }
];
