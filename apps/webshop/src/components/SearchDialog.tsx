import type { FC } from 'react';
import { formatPrice } from '../utils/formatPrice';
import  { PartiallyRequired, Product } from '../types';

import styles from './SearchDialog.module.css';

type SearchDialogProduct = PartiallyRequired<Product, "id" | "name" | "price">

interface SearchDialogProps {
  results: SearchDialogProduct[];
  onSelect: (id: string) => void;
}

export const SearchDialog: FC<SearchDialogProps> = ({ results, onSelect }) => {
  if (!results.length) return null;

  return (
    <div className={styles.dialog}>
      {results.map((result, index) => (
        <div
          key={index}
          className={styles.item}
          onClick={() => onSelect(result.id)}
        >
          <span className={styles.itemName}>{result.name}</span>
          <span className={styles.itemPrice}>{formatPrice(result.price)}</span>
        </div>
      ))}
    </div>
  );
}
