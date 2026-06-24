import { useContext } from 'react';
import { CartContext } from '../_app';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphQL } from '../../utils/fetchGraphQL';
import { formatPrice } from '../../utils/formatPrice';
import { Product } from '../../types';

import styles from './[id].module.css';

interface ProductPageProps {
  product?: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps<
  ProductPageProps
> = async context => {
  const id = context.params?.id;

  const data =
    id != null
      ? await fetchGraphQL<{ product: Product }>(
          `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          name
          description
          price
          category
          imageUrl
          stock
          createdAt
        }
      }
    `,
          { id },
        )
      : undefined;

  return {
    props: {
      product: data?.product
        ? {
            ...data.product,
            createdAt: new Date(data.product.createdAt).toLocaleDateString(),
          }
        : undefined,
    },
    revalidate: 60,
  };
};

export default function ProductPage({ product }: ProductPageProps) {
  const { cart } = useContext(CartContext) as any;

  const handleAddToCart = () => {
    if (!product || !product.stock) return;

    cart.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img src={product.imageUrl} alt="" className={styles.image} />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.meta}>
            Listed: {product.createdAt}
            {' · '}
            {product.stock} in stock
          </p>
          <div className={styles.addToCart} onClick={handleAddToCart}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}
