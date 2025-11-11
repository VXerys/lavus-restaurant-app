// Mock data for popular menu items shown on Home Screen
// Using local images from assets/MenuImages for offline-first approach
// Structure matches MenuItem type for easy API migration

import { MenuImages } from '../../assets';
import { ImageSourcePropType } from 'react-native';

export interface PopularMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: ImageSourcePropType;
  category: 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta';
}

// Salad Menu Items
export const saladMenuItems: PopularMenuItem[] = [
  {
    id: 'pm-salad-001',
    name: 'Salmon Salad',
    description: 'Introduction about dishes',
    price: 39,
    rating: 5.0,
    reviewCount: 2000,
    image: MenuImages.salad.salad1,
    category: 'salad',
  },
  {
    id: 'pm-salad-002',
    name: 'Shrimp Salad',
    description: 'Introduction about dishes',
    price: 29,
    rating: 4.5,
    reviewCount: 2000,
    image: MenuImages.salad.salad2,
    category: 'salad',
  },
  {
    id: 'pm-salad-003',
    name: "Lavu's Salad",
    description: 'Introduction about dishes',
    price: 29,
    rating: 4.5,
    reviewCount: 2000,
    image: MenuImages.salad.salad3,
    category: 'salad',
  },
  {
    id: 'pm-salad-004',
    name: 'Fruit Salad',
    description: 'Introduction about dishes',
    price: 29,
    rating: 3.5,
    reviewCount: 2000,
    image: MenuImages.salad.salad4,
    category: 'salad',
  },
  {
    id: 'pm-salad-005',
    name: 'Tofu Salad',
    description: 'Introduction about dishes',
    price: 29,
    rating: 3.5,
    reviewCount: 2000,
    image: MenuImages.salad.salad5,
    category: 'salad',
  },
];

// Drink Menu Items
export const drinkMenuItems: PopularMenuItem[] = [
  {
    id: 'pm-drink-001',
    name: 'Fresh Orange Juice',
    description: 'Introduction about dishes',
    price: 15,
    rating: 4.8,
    reviewCount: 1500,
    image: MenuImages.drink.drink1,
    category: 'drink',
  },
  {
    id: 'pm-drink-002',
    name: 'Tropical Smoothie',
    description: 'Introduction about dishes',
    price: 18,
    rating: 4.9,
    reviewCount: 1800,
    image: MenuImages.drink.drink2,
    category: 'drink',
  },
  {
    id: 'pm-drink-003',
    name: 'Iced Coffee',
    description: 'Introduction about dishes',
    price: 12,
    rating: 4.7,
    reviewCount: 2200,
    image: MenuImages.drink.drink3,
    category: 'drink',
  },
  {
    id: 'pm-drink-004',
    name: 'Green Tea Latte',
    description: 'Introduction about dishes',
    price: 14,
    rating: 4.6,
    reviewCount: 1200,
    image: MenuImages.drink.drink4,
    category: 'drink',
  },
  {
    id: 'pm-drink-005',
    name: 'Berry Blast',
    description: 'Introduction about dishes',
    price: 16,
    rating: 4.8,
    reviewCount: 1600,
    image: MenuImages.drink.drink5,
    category: 'drink',
  },
];

// Pizza Menu Items
export const pizzaMenuItems: PopularMenuItem[] = [
  {
    id: 'pm-pizza-001',
    name: 'Margherita Pizza',
    description: 'Introduction about dishes',
    price: 45,
    rating: 4.9,
    reviewCount: 2500,
    image: MenuImages.pizza.pizza1,
    category: 'pizza',
  },
  {
    id: 'pm-pizza-002',
    name: 'Pepperoni Delight',
    description: 'Introduction about dishes',
    price: 49,
    rating: 5.0,
    reviewCount: 3000,
    image: MenuImages.pizza.pizza2,
    category: 'pizza',
  },
  {
    id: 'pm-pizza-003',
    name: 'Veggie Supreme',
    description: 'Introduction about dishes',
    price: 42,
    rating: 4.7,
    reviewCount: 1800,
    image: MenuImages.pizza.pizza3,
    category: 'pizza',
  },
  {
    id: 'pm-pizza-004',
    name: 'Hawaiian Pizza',
    description: 'Introduction about dishes',
    price: 46,
    rating: 4.5,
    reviewCount: 2100,
    image: MenuImages.pizza.pizza4,
    category: 'pizza',
  },
];

// Dessert Menu Items
export const dessertMenuItems: PopularMenuItem[] = [
  {
    id: 'pm-dessert-001',
    name: 'Chocolate Cake',
    description: 'Introduction about dishes',
    price: 25,
    rating: 5.0,
    reviewCount: 2800,
    image: MenuImages.dessert.dessert1,
    category: 'dessert',
  },
  {
    id: 'pm-dessert-002',
    name: 'Tiramisu',
    description: 'Introduction about dishes',
    price: 28,
    rating: 4.9,
    reviewCount: 2400,
    image: MenuImages.dessert.dessert2,
    category: 'dessert',
  },
  {
    id: 'pm-dessert-003',
    name: 'Ice Cream Sundae',
    description: 'Introduction about dishes',
    price: 20,
    rating: 4.8,
    reviewCount: 3200,
    image: MenuImages.dessert.dessert3,
    category: 'dessert',
  },
  {
    id: 'pm-dessert-004',
    name: 'Fruit Tart',
    description: 'Introduction about dishes',
    price: 24,
    rating: 4.7,
    reviewCount: 1900,
    image: MenuImages.dessert.dessert4,
    category: 'dessert',
  },
  {
    id: 'pm-dessert-005',
    name: 'Cheesecake',
    description: 'Introduction about dishes',
    price: 26,
    rating: 4.9,
    reviewCount: 2600,
    image: MenuImages.dessert.dessert5,
    category: 'dessert',
  },
];

// Pasta Menu Items
export const pastaMenuItems: PopularMenuItem[] = [
  {
    id: 'pm-pasta-001',
    name: 'Carbonara',
    description: 'Introduction about dishes',
    price: 38,
    rating: 4.9,
    reviewCount: 2300,
    image: MenuImages.pasta.pasta1,
    category: 'pasta',
  },
  {
    id: 'pm-pasta-002',
    name: 'Bolognese',
    description: 'Introduction about dishes',
    price: 36,
    rating: 4.8,
    reviewCount: 2100,
    image: MenuImages.pasta.pasta2,
    category: 'pasta',
  },
  {
    id: 'pm-pasta-003',
    name: 'Aglio Olio',
    description: 'Introduction about dishes',
    price: 32,
    rating: 4.7,
    reviewCount: 1800,
    image: MenuImages.pasta.pasta3,
    category: 'pasta',
  },
  {
    id: 'pm-pasta-004',
    name: 'Pesto Pasta',
    description: 'Introduction about dishes',
    price: 35,
    rating: 4.8,
    reviewCount: 2000,
    image: MenuImages.pasta.pasta4,
    category: 'pasta',
  },
  {
    id: 'pm-pasta-005',
    name: 'Seafood Linguine',
    description: 'Introduction about dishes',
    price: 42,
    rating: 5.0,
    reviewCount: 2500,
    image: MenuImages.pasta.pasta5,
    category: 'pasta',
  },
];

// Helper function to get menu items by category
export const getMenuItemsByCategory = (category: 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta'): PopularMenuItem[] => {
  switch (category) {
    case 'salad':
      return saladMenuItems;
    case 'drink':
      return drinkMenuItems;
    case 'pizza':
      return pizzaMenuItems;
    case 'dessert':
      return dessertMenuItems;
    case 'pasta':
      return pastaMenuItems;
    default:
      return saladMenuItems;
  }
};

// Default export for backward compatibility
export const popularMenuItems = saladMenuItems;
