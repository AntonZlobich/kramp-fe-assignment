import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ProductCard } from '../components/ProductCard';
import { useSSRQuerySearchTracker } from '../hooks/useSSRQuerySearchTracker';
import { groupBy } from '../utils/groupBy';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import type { Product, ProductCategory } from '../types';

import styles from './search.module.css';

type SearchPageProduct = Pick<
  Product,
  'id' | 'name' | 'price' | 'imageUrl' | 'category'
>;

interface SearchPageProps {
  grouped: Record<ProductCategory, SearchPageProduct[]> | null;
  query: string;
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const queryData = context.query.q;
  const query = typeof queryData === 'string' ? queryData : '';

  const data = await fetchGraphQL<{ searchProducts: SearchPageProduct[] }>(
    `
      query SearchProducts($q: String!) {
        searchProducts(query: $q) {
          id
          name
          price
          imageUrl
          category
        }
      }
    `,
    { q: query },
  );

  const grouped = data?.searchProducts?.length
    ? groupBy(data.searchProducts, 'category')
    : null;

  return {
    props: {
      grouped,
      query,
    },
  };
};

export default function SearchPage({ grouped, query }: SearchPageProps) {
  const { isSearching } = useSSRQuerySearchTracker();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {query ? `Results for "${query}"` : 'All products'}
        </h1>

        {isSearching && <p>Loading...</p>}

        {!isSearching && !grouped && (
          <p className={styles.empty}>No products found.</p>
        )}

        {grouped &&
          Object.entries(grouped).map(([category, products]) => (
            <section key={category} className={styles.category}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <div className={styles.grid}>
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
