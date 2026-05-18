import React from 'react';
import { useRouter } from 'next/router';
import styles from './ProductCard.module.css';

const ProductCard: React.FC<any> = ({ product, onAddToCart }) => {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      data-testid="product-card"
    >
      <img
        src={product.imageUrl}
        alt=""
        width="300"
        height="200"
        className={styles.image}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price} data-testid="product-price">€{product.price.toFixed(2)}</p>
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

(ProductCard as any).defaultProps = {
  onAddToCart: () => {},
};

export default ProductCard;
