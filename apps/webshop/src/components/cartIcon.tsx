import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './cartIcon.module.css';

interface CartIconProps {
  count: number;
}

export function CartIcon({ count }: CartIconProps) {
  const router = useRouter();
  const [label, setLabel] = useState('Cart');

  useEffect(() => {
    if (count > 0) {
      setLabel(`Cart (${count})`);
    } else {
      setLabel('Cart');
    }
  }, [count]);

  return (
    <div
      onClick={() => router.push('/checkout')}
      className={styles.cartIcon}
    >
      <span className={styles.label}>{label}</span>
      {count > 0 && (
        <span className={styles.badge}>{count}</span>
      )}
    </div>
  );
}
