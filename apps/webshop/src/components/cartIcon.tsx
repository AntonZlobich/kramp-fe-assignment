import { useRouter } from 'next/router';
import { useLocalVariablesHydration } from '../hooks/useLocalVariablesHydration';

import styles from './cartIcon.module.css';

interface CartIconProps {
  count: number;
}

export function CartIcon({ count }: CartIconProps) {
  const router = useRouter();
  const label = useLocalVariablesHydration(
    count > 0 ? `Cart (${count})` : 'Cart',
    'Cart',
  );
  const hydrationSafeCount = useLocalVariablesHydration(count, 0);

  return (
    <div onClick={() => router.push('/checkout')} className={styles.cartIcon}>
      <span className={styles.label}>{label}</span>
      {hydrationSafeCount > 0 && (
        <span className={styles.badge}>{hydrationSafeCount}</span>
      )}
    </div>
  );
}
