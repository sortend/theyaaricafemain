import { useAuth } from '@/lib/AuthProvider';
import { useOrders } from '@/lib/useOrders';

export default function OrderHistory() {
  const { user } = useAuth();
  const orders = useOrders(user?.id ?? '');

  if (!user) return <p>Loading…</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. Browse the <a href="/menu" className="text-gold-600 underline">menu</a>.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded">
              <strong>Order #{order.id}</strong> – Status: {order.status}
              <br />
              Total: $ {(order.total_cents / 100).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
