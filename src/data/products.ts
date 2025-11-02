export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  available?: number;
  sold?: number;
  customizable?: boolean;
  options?: {
    cupSize?: string[];
    iceLevel?: string[];
    sugarLevel?: string[];
    topping?: string[];
  };
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  customization?: {
    cupSize?: string;
    iceLevel?: string;
    sugarLevel?: string;
    topping?: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Caramel Java Frappuccino',
    price: 35000,
    category: 'Coffee',
    image: '☕',
    available: 24,
    sold: 5,
    customizable: true,
    options: {
      cupSize: ['S', 'M', 'L'],
      iceLevel: ['30', '60', '100'],
      sugarLevel: ['30', '60', '100'],
      topping: ['Chocolate Foam', 'Caramel', 'Whipped Cream'],
    },
  },
  {
    id: '2',
    name: 'Java Chip Frappuccino',
    price: 35000,
    category: 'Coffee',
    image: '☕',
    available: 0,
    sold: 6,
    customizable: true,
    options: {
      cupSize: ['S', 'M', 'L'],
      iceLevel: ['30', '60', '100'],
      sugarLevel: ['30', '60', '100'],
      topping: ['Chocolate Foam', 'Caramel', 'Whipped Cream'],
    },
  },
  {
    id: '3',
    name: 'Coffee Jelly Frappuccino',
    price: 25250,
    category: 'Coffee',
    image: '☕',
    available: 24,
    sold: 5,
    customizable: true,
    options: {
      cupSize: ['S', 'M', 'L'],
      iceLevel: ['30', '60', '100'],
      sugarLevel: ['30', '60', '100'],
    },
  },
  {
    id: '4',
    name: 'Mocha Jelly Frappuccino',
    price: 25500,
    category: 'Coffee',
    image: '☕',
    available: 24,
    sold: 5,
    customizable: true,
    options: {
      cupSize: ['S', 'M', 'L'],
      iceLevel: ['30', '60', '100'],
      sugarLevel: ['30', '60', '100'],
    },
  },
  {
    id: '5',
    name: 'Green Tea Latte',
    price: 28000,
    category: 'Tea',
    image: '🍵',
    available: 15,
    sold: 3,
    customizable: true,
  },
  {
    id: '6',
    name: 'Orange Juice',
    price: 22000,
    category: 'Juice',
    image: '🧃',
    available: 20,
    sold: 8,
    customizable: false,
  },
  {
    id: '7',
    name: 'Rice Bowl',
    price: 45000,
    category: 'Rice',
    image: '🍚',
    available: 10,
    sold: 2,
    customizable: false,
  },
  {
    id: '8',
    name: 'Pasta Carbonara',
    price: 55000,
    category: 'Pasta',
    image: '🍝',
    available: 8,
    sold: 1,
    customizable: false,
  },
];

export const categories = ['All Menu', 'Coffee', 'Tea', 'Juice', 'Rice', 'Pasta'];
