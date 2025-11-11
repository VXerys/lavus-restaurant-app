import { RewardItem } from '../../types';

export const rewards: RewardItem[] = [
  // 100-300 points
  {
    id: 'r-001',
    name: 'Red Tea',
    description: 'Refreshing red tea with natural ingredients',
    points: 100,
    category: '100-300',
    image: require('@assets/images/menu/Drink-1.png'),
    isAvailable: true,
  },
  {
    id: 'r-002',
    name: 'Berry Juice',
    description: 'Fresh mixed berry juice with natural sweetness',
    points: 100,
    category: '100-300',
    image: require('@assets/images/menu/Drink-2.png'),
    isAvailable: true,
  },
  {
    id: 'r-003',
    name: 'Capuchino',
    description: 'Classic Italian cappuccino with rich espresso',
    points: 100,
    category: '100-300',
    image: require('@assets/images/menu/Drink-3.png'),
    isAvailable: true,
  },
  {
    id: 'r-004',
    name: 'Fried Ice',
    description: 'Unique fried ice cream dessert with toppings',
    points: 200,
    category: '100-300',
    image: require('@assets/images/menu/Dessert-1.png'),
    isAvailable: true,
  },
  {
    id: 'r-005',
    name: 'Ice Cream',
    description: 'Premium ice cream with various flavors',
    points: 200,
    category: '100-300',
    image: require('@assets/images/menu/Dessert-2.png'),
    isAvailable: true,
  },
  {
    id: 'r-006',
    name: 'Ice Cake',
    description: 'Delicious ice cake with creamy layers',
    points: 200,
    category: '100-300',
    image: require('@assets/images/menu/Dessert-3.png'),
    isAvailable: true,
  },
  
  // 300-400 points
  {
    id: 'r-007',
    name: 'Shrimp Salad',
    description: 'Fresh salad with grilled shrimp and vegetables',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Salad-1.png'),
    isAvailable: true,
  },
  {
    id: 'r-008',
    name: "Lavu's Salad",
    description: "Special house salad with Lavu's signature dressing",
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Salad-2.png'),
    isAvailable: true,
  },
  {
    id: 'r-009',
    name: 'Fruit Salad',
    description: 'Fresh seasonal fruits with honey dressing',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Salad-3.png'),
    isAvailable: true,
  },
  {
    id: 'r-010',
    name: 'Tofu Salad',
    description: 'Healthy tofu salad with mixed greens',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Salad-4.png'),
    isAvailable: true,
  },
  {
    id: 'r-011',
    name: 'Chesse Pizza',
    description: 'Classic cheese pizza with mozzarella',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Pizza-1.png'),
    isAvailable: true,
  },
  {
    id: 'r-012',
    name: 'Bacon Pizza',
    description: 'Delicious pizza topped with crispy bacon',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Pizza-2.png'),
    isAvailable: true,
  },
  {
    id: 'r-013',
    name: 'BBQ Pizza',
    description: 'BBQ chicken pizza with special sauce',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Pizza-3.png'),
    isAvailable: true,
  },
  {
    id: 'r-014',
    name: 'Steak Pizza',
    description: 'Premium pizza with tender steak pieces',
    points: 300,
    category: '300-400',
    image: require('@assets/images/menu/Pizza-4.png'),
    isAvailable: true,
  },
];

export const getRewardsByCategory = (category: string) => {
  return rewards.filter(reward => reward.category === category);
};

export const getRewardById = (id: string) => {
  return rewards.find(reward => reward.id === id);
};
