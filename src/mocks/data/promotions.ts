import { Promotion } from '../../types'; // Adjust the path as needed to point to where Promotion is actually defined

export const promotions: Promotion[] = [
  {
    id: 'p-001',
    title: 'Hemat November 11.11',
    description: 'Diskon 20% untuk semua menu utama, minimal transaksi 50rb',
    banner: 'https://picsum.photos/seed/promo1111/800/320',
    discountPercent: 20,
    startDate: '2025-11-01T00:00:00.000Z',
    endDate: '2025-11-12T23:59:59.999Z',
    active: true,
    createdAt: '2025-10-28T10:00:00.000Z',
    updatedAt: '2025-10-28T10:00:00.000Z'
  },
  {
    id: 'p-002',
    title: 'Happy Hour 15-17',
    description: 'Beli 2 gratis 1 untuk semua minuman dingin',
    banner: 'https://picsum.photos/seed/happyhour/800/320',
    discountPercent: 33,
    startDate: '2025-11-01T15:00:00.000Z',
    endDate: '2025-12-31T17:00:00.000Z',
    active: true,
    createdAt: '2025-10-28T10:00:00.000Z',
    updatedAt: '2025-10-28T10:00:00.000Z'
  }
];
