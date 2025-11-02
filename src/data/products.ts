export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Espresso',
    price: 25000,
    category: 'Coffee',
    image: '☕',
  },
  {
    id: '2',
    name: 'Americano',
    price: 30000,
    category: 'Coffee',
    image: '☕',
  },
  {
    id: '3',
    name: 'Cappuccino',
    price: 35000,
    category: 'Coffee',
    image: '☕',
  },
  {
    id: '4',
    name: 'Latte',
    price: 40000,
    category: 'Coffee',
    image: '☕',
  },
  {
    id: '5',
    name: 'Croissant',
    price: 45000,
    category: 'Food',
    image: '🥐',
  },
  {
    id: '6',
    name: 'Donut',
    price: 20000,
    category: 'Food',
    image: '🍩',
  },
  {
    id: '7',
    name: 'Sandwich',
    price: 55000,
    category: 'Food',
    image: '🥪',
  },
  {
    id: '8',
    name: 'Iced Tea',
    price: 15000,
    category: 'Beverage',
    image: '🧋',
  },
];

export const categories = ['All', 'Coffee', 'Food', 'Beverage'];
