import _ from 'lodash';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CartContext } from '../pages/_app';
import { SearchDialog } from './SearchDialog';
import { CartIcon } from './cartIcon';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import type { Product } from '../types';

import styles from './Header.module.css';

type HeaderSearchProduct = Pick<Product, 'id' | 'name' | 'price'>;

export function Header() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HeaderSearchProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(results.length > 0);
  }, [results]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      _.debounce((query) => {
        fetchGraphQL<{ searchProducts: HeaderSearchProduct[] }>(
          `
            query Search($q: String!) {
              searchProducts(query: $q) {
                id
                name
                price
              }
            }
          `,
          { q: query },
        ).then(data => {
          setResults(data.searchProducts.slice(0, 5));
        });
      }, 250),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);

    if (!newQuery) {
      setResults([]);
      return;
    }

    debouncedSearch(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
      if (query.trim()) {
        router.push('/search?q=' + encodeURIComponent(query));
      } else {
        router.push('/search');
      }
    }
  };

  const isActivePage = (path: string) => {
    return router.pathname.indexOf(path) !== -1;
  };

  const truncatedQuery = query.length > 30
    ? query.substring(0, 30)
    : undefined;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Kramp
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={
              isActivePage('/') && router.pathname === '/'
                ? styles.activeLink
                : styles.navLink
            }
          >
            Home
          </Link>
          <Link
            href="/search"
            className={
              isActivePage('/search') ? styles.activeLink : styles.navLink
            }
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className={
              isActivePage('/checkout') ? styles.activeLink : styles.navLink
            }
          >
            Checkout
          </Link>
        </nav>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={query}
            placeholder="Search products..."
            className={styles.searchInput}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={e => e.stopPropagation()}
            onFocus={() => {
              setIsOpen(results.length > 0);
            }}
          />
          {truncatedQuery && (
            <span className={styles.truncatedHint}>
              Searching: {truncatedQuery}…
            </span>
          )}
          {isOpen && (
            <SearchDialog
              results={results}
              onSelect={(id: string) => {
                router.push(`/product/${id}`);
                setIsOpen(false);
                setQuery('');
              }}
            />
          )}
        </div>

        <CartIcon count={cart.totalItems} />
      </div>
    </header>
  );
}
