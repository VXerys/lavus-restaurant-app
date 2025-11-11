import { ImageSourcePropType } from 'react-native';
import { MenuImages } from '@assets';

export interface MenuDetail {
  id: string;
  name: string;
  image: ImageSourcePropType;
  rating: number;
  reviewCount: number;
  calories: number;
  description: string;
  category: 'salad' | 'drink' | 'pizza' | 'dessert' | 'pasta';
}

export const menuDetailsData: Record<string, MenuDetail> = {
  // Salads
  'salad-1': {
    id: 'salad-1',
    name: 'Salmon Salad',
    image: MenuImages.salad.salad1,
    rating: 4.8,
    reviewCount: 350,
    calories: 200,
    category: 'salad',
    description: 'Fresh Norwegian salmon grilled to perfection, served on a bed of crispy mixed greens, cherry tomatoes, cucumber, and red onion. Topped with our signature lemon herb dressing and garnished with toasted sesame seeds. This protein-rich dish is perfect for a healthy lunch or light dinner.',
  },
  'salad-2': {
    id: 'salad-2',
    name: 'Shrimp Salad',
    image: MenuImages.salad.salad2,
    rating: 4.6,
    reviewCount: 420,
    calories: 180,
    category: 'salad',
    description: 'Succulent grilled shrimp served on a bed of fresh mixed greens, cherry tomatoes, avocado, and cucumber. Drizzled with a zesty citrus vinaigrette and garnished with crispy tortilla strips. A light yet protein-packed meal perfect for seafood lovers.',
  },
  'salad-3': {
    id: 'salad-3',
    name: "Lavu's Salad",
    image: MenuImages.salad.salad3,
    rating: 4.7,
    reviewCount: 290,
    calories: 150,
    category: 'salad',
    description: 'Our signature house salad featuring fresh romaine lettuce, grilled chicken, cherry tomatoes, corn, black beans, and cheddar cheese. Topped with crispy tortilla strips and our special Lavu\'s dressing. A customer favorite that perfectly balances flavor and nutrition.',
  },
  'salad-4': {
    id: 'salad-4',
    name: 'Fruit Salad',
    image: MenuImages.salad.salad4,
    rating: 4.9,
    reviewCount: 380,
    calories: 120,
    category: 'salad',
    description: 'A refreshing mix of seasonal fresh fruits including watermelon, pineapple, mango, strawberries, and kiwi. Lightly dressed with honey-lime glaze and garnished with fresh mint leaves. The perfect healthy dessert or breakfast option bursting with natural sweetness.',
  },
  'salad-5': {
    id: 'salad-5',
    name: 'Tofu Salad',
    image: MenuImages.salad.salad5,
    rating: 4.7,
    reviewCount: 315,
    calories: 195,
    category: 'salad',
    description: 'Crispy pan-fried tofu cubes served with mixed greens, edamame, shredded carrots, red cabbage, and sesame seeds. Dressed with our house-made ginger-sesame dressing. A delicious plant-based option packed with protein and flavor.',
  },

  // Drinks
  'drink-1': {
    id: 'drink-1',
    name: 'Fresh Orange Juice',
    image: MenuImages.drink.drink1,
    rating: 4.8,
    reviewCount: 520,
    calories: 110,
    category: 'drink',
    description: 'Freshly squeezed orange juice made from premium Valencia oranges. No added sugar or preservatives, just pure vitamin C goodness. Each glass is prepared to order, ensuring maximum freshness and natural sweetness. The perfect way to start your morning.',
  },
  'drink-2': {
    id: 'drink-2',
    name: 'Tropical Smoothie',
    image: MenuImages.drink.drink2,
    rating: 4.6,
    reviewCount: 280,
    calories: 95,
    category: 'drink',
    description: 'A revitalizing blend of fresh mango, pineapple, banana, and coconut milk. Enhanced with a touch of passion fruit for an extra tropical kick. This exotic smoothie transports you to a beach paradise with every sip while providing natural energy.',
  },
  'drink-3': {
    id: 'drink-3',
    name: 'Iced Coffee',
    image: MenuImages.drink.drink3,
    rating: 4.9,
    reviewCount: 445,
    calories: 80,
    category: 'drink',
    description: 'Premium cold-brewed coffee served over ice with a splash of milk and light sweetener. Smooth, refreshing, and perfectly balanced. The ultimate pick-me-up for coffee lovers who want their caffeine fix served cold.',
  },
  'drink-4': {
    id: 'drink-4',
    name: 'Green Tea Latte',
    image: MenuImages.drink.drink4,
    rating: 4.7,
    reviewCount: 395,
    calories: 105,
    category: 'drink',
    description: 'Premium Japanese matcha green tea blended with steamed milk and a hint of honey. Creamy, earthy, and slightly sweet. Rich in antioxidants and L-theanine for calm, focused energy. Can be served hot or iced.',
  },

  // Pizza
  'pizza-1': {
    id: 'pizza-1',
    name: 'Margherita Pizza',
    image: MenuImages.pizza.pizza1,
    rating: 4.8,
    reviewCount: 680,
    calories: 250,
    category: 'pizza',
    description: 'Traditional Italian Margherita with hand-stretched dough, San Marzano tomato sauce, fresh mozzarella, and aromatic basil leaves. Baked in our wood-fired oven at 900°F for that perfect crispy crust with a slightly charred edge. Simple, authentic, and absolutely delicious.',
  },
  'pizza-2': {
    id: 'pizza-2',
    name: 'Pepperoni Delight',
    image: MenuImages.pizza.pizza2,
    rating: 4.9,
    reviewCount: 850,
    calories: 285,
    category: 'pizza',
    description: 'Our most popular pizza! Generous portions of premium pepperoni covering our signature tomato sauce and melted mozzarella cheese. Each slice is perfectly balanced with the right amount of spice and cheese. A crowd favorite that never goes out of style.',
  },
  'pizza-3': {
    id: 'pizza-3',
    name: 'Veggie Supreme',
    image: MenuImages.pizza.pizza3,
    rating: 4.7,
    reviewCount: 540,
    calories: 230,
    category: 'pizza',
    description: 'A colorful medley of bell peppers, mushrooms, olives, red onions, tomatoes, and fresh spinach. Loaded with vegetables and topped with mozzarella cheese. Proof that vegetarian pizza can be just as satisfying and flavorful as any meat option.',
  },
  'pizza-4': {
    id: 'pizza-4',
    name: 'Hawaiian Pizza',
    image: MenuImages.pizza.pizza4,
    rating: 4.6,
    reviewCount: 415,
    calories: 260,
    category: 'pizza',
    description: 'The classic love-it-or-hate-it combination of ham, pineapple chunks, and mozzarella cheese on our signature tomato base. Sweet and savory flavors create a unique tropical twist on traditional pizza. Baked to perfection with caramelized pineapple edges.',
  },

  // Desserts
  'dessert-1': {
    id: 'dessert-1',
    name: 'Chocolate Lava Cake',
    image: MenuImages.dessert.dessert1,
    rating: 4.9,
    reviewCount: 720,
    calories: 380,
    category: 'dessert',
    description: 'Decadent chocolate cake with a molten chocolate center that flows like lava when you cut into it. Served warm with a scoop of vanilla ice cream and fresh berries. The ultimate indulgence for chocolate lovers. Pure bliss in every spoonful.',
  },
  'dessert-2': {
    id: 'dessert-2',
    name: 'Tiramisu',
    image: MenuImages.dessert.dessert2,
    rating: 4.8,
    reviewCount: 625,
    calories: 310,
    category: 'dessert',
    description: 'Authentic Italian tiramisu featuring layers of espresso-soaked ladyfingers and creamy mascarpone cheese. Dusted with premium cocoa powder and garnished with chocolate shavings. The perfect balance of coffee and sweetness in every bite.',
  },
  'dessert-3': {
    id: 'dessert-3',
    name: 'Ice Cream Sundae',
    image: MenuImages.dessert.dessert3,
    rating: 4.7,
    reviewCount: 490,
    calories: 320,
    category: 'dessert',
    description: 'Classic ice cream sundae with three scoops of premium vanilla ice cream, rich chocolate fudge sauce, whipped cream, and a cherry on top. Garnished with crushed nuts and colorful sprinkles. A nostalgic treat that brings joy to all ages.',
  },
  'dessert-4': {
    id: 'dessert-4',
    name: 'Fruit Tart',
    image: MenuImages.dessert.dessert4,
    rating: 4.6,
    reviewCount: 555,
    calories: 280,
    category: 'dessert',
    description: 'Buttery shortbread crust filled with smooth vanilla custard and topped with an array of fresh seasonal fruits including strawberries, kiwi, blueberries, and mandarin oranges. Finished with a light apricot glaze. A beautiful and delicious dessert.',
  },

  // Pasta
  'pasta-1': {
    id: 'pasta-1',
    name: 'Carbonara Pasta',
    image: MenuImages.pasta.pasta1,
    rating: 4.8,
    reviewCount: 590,
    calories: 420,
    category: 'pasta',
    description: 'Classic Roman carbonara made with al dente spaghetti, crispy pancetta, egg yolks, Pecorino Romano cheese, and black pepper. Creamy without cream, this authentic Italian dish is comfort food at its finest. Each strand is perfectly coated in the silky sauce.',
  },
  'pasta-2': {
    id: 'pasta-2',
    name: 'Bolognese',
    image: MenuImages.pasta.pasta2,
    rating: 4.7,
    reviewCount: 475,
    calories: 450,
    category: 'pasta',
    description: 'Slow-cooked meat sauce made with ground beef, tomatoes, red wine, and aromatic vegetables. Simmered for hours to develop deep, rich flavors. Served over perfectly cooked spaghetti and finished with fresh Parmesan. A hearty, satisfying Italian classic.',
  },
  'pasta-3': {
    id: 'pasta-3',
    name: 'Aglio Olio',
    image: MenuImages.pasta.pasta3,
    rating: 4.9,
    reviewCount: 640,
    calories: 380,
    category: 'pasta',
    description: 'Simple yet flavorful spaghetti tossed in extra virgin olive oil, fresh garlic, red pepper flakes, and Italian parsley. Finished with a squeeze of lemon and grated Parmesan. Sometimes the simplest dishes are the most satisfying.',
  },
  'pasta-4': {
    id: 'pasta-4',
    name: 'Pesto Pasta',
    image: MenuImages.pasta.pasta4,
    rating: 4.8,
    reviewCount: 510,
    calories: 390,
    category: 'pasta',
    description: 'Fresh linguine tossed in house-made basil pesto with pine nuts, garlic, Parmesan cheese, and extra virgin olive oil. Topped with cherry tomatoes and toasted pine nuts. The vibrant green color matches the fresh, herbaceous flavor.',
  },
  'pasta-5': {
    id: 'pasta-5',
    name: 'Seafood Linguine',
    image: MenuImages.pasta.pasta5,
    rating: 4.7,
    reviewCount: 445,
    calories: 410,
    category: 'pasta',
    description: 'Linguine with fresh shrimp, mussels, clams, and calamari in a light garlic white wine sauce. Flavored with red pepper flakes and fresh parsley. A taste of the Mediterranean sea that brings together the best flavors of the ocean.',
  },
};

export const getMenuDetail = (menuId: string): MenuDetail | undefined => {
  return menuDetailsData[menuId];
};

export default menuDetailsData;
