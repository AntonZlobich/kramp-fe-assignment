import { storiesOf } from '@storybook/react';
import { ProductCard } from '../components/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Heavy Duty Hammer',
  price: 18.99,
  imageUrl: 'https://placehold.co/300x200',
  description: 'A solid 500g steel hammer for demanding workshop tasks.',
  category: 'Tools',
  stock: 142,
  createdAt: '2024-01-15T10:00:00.000Z',
};

const expensiveProduct = {
  id: '17',
  name: 'Cordless Drill/Driver 18V',
  price: 119.00,
  imageUrl: 'https://placehold.co/300x200',
  description: '18V brushless cordless drill/driver with 2×2Ah batteries.',
  category: 'Power Tools',
  stock: 62,
  createdAt: '2024-01-18T10:00:00.000Z',
};

storiesOf('ProductCard', module)
  .add('default', () => <ProductCard product={mockProduct} />)
  .add('expensive item', () => <ProductCard product={expensiveProduct} />)
  .add('out of stock', () => <ProductCard product={{ ...mockProduct, stock: 0 }} />);
