import type { GetStaticProps } from 'next';
import { ProductCard } from '../components/ProductCard';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import type { Product } from '../types';

import styles from './index.module.css';

type HomePageProduct = Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'>;

interface HomePageProps {
  featured: HomePageProduct[];
  lastUpdated: string;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const FEATURED_IDS = ['1', '4', '11', '17'];

  const data = await fetchGraphQL<{ products: HomePageProduct[] }>(
    `
      query GetProducts($ids: [ID!]!) {
        products(ids: $ids) {
          id
          name
          price
          imageUrl
        }
      }
    `,
    { ids: FEATURED_IDS },
  );

  return {
    props: {
      featured: data.products ?? [],
      lastUpdated: new Date(Date.now()).toLocaleTimeString(),
    },
    revalidate: 60,
  };
};

export default function HomePage({ featured, lastUpdated }: HomePageProps) {
  return (
    <div>
      <section className={styles.hero}>
        <img
          src="https://placehold.co/1200x800/e63329/ffffff?text=Kramp+Webshop"
          alt="Kramp — Your industrial supply partner"
          loading="lazy"
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Industrial supplies, delivered.</h1>
          <p className={styles.heroSubtitle}>
            Tools, fasteners, safety equipment and power tools for
            professionals.
          </p>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2>Featured products</h2>
          <p className={styles.timestamp}>Last updated: {lastUpdated}</p>
        </div>
        <div className={styles.grid}>
          {featured.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.categories}>
        <div className={styles.categoriesOverlay}>
          <h2>Coming soon</h2>
        </div>
        <h2>Shop by category</h2>
        <div className={styles.categoryGrid}>
          {['Tools', 'Fasteners', 'Safety Equipment', 'Power Tools'].map(
            (cat, index) => (
              <a
                key={index}
                href={`/search?q=${cat}`}
                className={styles.categoryCard}
              >
                {cat}
              </a>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
