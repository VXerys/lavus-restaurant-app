import { Review } from '../../types'; // Adjust the path as needed to point to your Review type definition

export const reviews: Review[] = [
  {
    id: 'rev-001',
    userId: 'u-001',
    menuId: 'm-001',
    rating: 5,
    comment: 'Rasa mantap, porsi pas. Recommended!',
    createdAt: '2025-11-06T10:00:00.000Z',
    updatedAt: '2025-11-06T10:00:00.000Z'
  },
  {
    id: 'rev-002',
    userId: 'u-002',
    menuId: 'm-004',
    rating: 4,
    comment: 'Brownies enak, tapi saus lava agak terlalu manis.',
    createdAt: '2025-11-06T10:05:00.000Z',
    updatedAt: '2025-11-06T10:05:00.000Z'
  }
];
