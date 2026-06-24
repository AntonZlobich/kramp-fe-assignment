import React from 'react';
import { useRouter } from 'next/router';
import { formatPrice } from '../utils/formatPrice';
import type { PartiallyRequired, Product } from '../types';

import styles from './ProductCard.module.css';

type ProductCardProduct = PartiallyRequired<Product, 'id' | 'name' | 'price' | 'imageUrl'>;

interface ProductCardProps {
  product: ProductCardProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div className={styles.card} data-testid="product-card">
      <img
        src={product.imageUrl}
        alt=""
        width="300"
        height="200"
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price} data-testid="product-price">
          {formatPrice(product.price)}
        </p>
        <div
          onClick={() => router.push(`/product/${product.id}`)}
          className={styles.button}
        >
          View product
        </div>
      </div>
    </div>
  );
};
