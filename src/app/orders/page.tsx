import RequireAuth from '@ui/components/RequireAuth';
import OrderHistory from '@/components/OrderHistory';

export default function OrdersPage() {
  return (
    <RequireAuth>
      <OrderHistory />
    </RequireAuth>
  );
}
