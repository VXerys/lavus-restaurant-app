import { Reservation } from '../../types'; // Adjust the path as needed to point to your actual types file

export const reservations: Reservation[] = [
  {
    id: 'r-001',
    userId: 'u-001',
    name: 'Budi Santoso',
    date: '2025-11-12T18:30:00.000Z',
    partySize: 4,
    status: 'confirmed',
    notes: 'Minta meja dekat jendela',
    createdAt: '2025-11-05T08:00:00.000Z',
    updatedAt: '2025-11-05T08:00:00.000Z'
  },
  {
    id: 'r-002',
    userId: 'u-002',
    name: 'Siti Aisyah',
    date: '2025-11-12T19:00:00.000Z',
    partySize: 2,
    status: 'pending',
    createdAt: '2025-11-06T09:00:00.000Z',
    updatedAt: '2025-11-06T09:00:00.000Z'
  }
];
