import Link from 'next/link';
import { useCart } from '@/lib/CartProvider';
import { Button } from '@ui';

export default function Cart() {
  const { items, removeItem, updateQuantity, clear } = useCart();

  const totalCents = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return (
    <section className="p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty. Browse the <Link href="/menu" className="text-gold-600 underline">menu</Link>.</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {items.map(i => (
              <li key={i.menuItem.id} className="flex items-center justify-between border p-2 rounded">
                <span>{i.menuItem.name}</span>
                <span>
                  Qty:
                  <input
                    type="number"
                    min="1"
                    value={i.quantity}
                    onChange={e => updateQuantity(i.menuItem.id, Number(e.target.value))}
                    className="w-16 ml-2 border rounded"
                  />
                </span>
                <span>${(i.menuItem.price * i.quantity / 100).toFixed(2)}</span>
                <Button variant="ghost" onClick={() => removeItem(i.menuItem.id)}>Remove</Button>
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: ${ (totalCents / 100).toFixed(2) }</p>
          <div className="flex gap-4">
            <Link href="/checkout" className="inline-block">
              <Button variant="primary">Proceed to Checkout</Button>
            </Link>
            <Button variant="secondary" onClick={clear}>Clear Cart</Button>
          </div>
        </>
      )}
    </section>
  );
}
