import Link from 'next/link';
import { useMenu } from '@/lib/useMenu';
import { useCart } from '@/lib/CartProvider';
import { Button } from '@ui';

export default function Menu() {
  const menu = useMenu();
  const { addItem } = useCart();

  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {menu.map(item => (
        <article key={item.id} className="border rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold">{item.name}</h3>
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="mb-2 w-full rounded" />
          )}
          <p className="text-gray-700">{item.description}</p>
          <p className="font-bold text-gold-600">$ {(item.price / 100).toFixed(2)}</p>
          <Button variant="primary" onClick={() => addItem(item)}>Add to Cart</Button>
        </article>
      ))}
    </section>
  );
}
