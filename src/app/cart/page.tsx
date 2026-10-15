import RequireAuth from '@ui/components/RequireAuth';
import Cart from '@/components/Cart';

export default function CartPage() {
  return (
    <RequireAuth>
      <Cart />
    </RequireAuth>
  );
}
