export default function Checkout() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!user) return <p>Loading…</p>;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setLoading(true);
    const payload = {
      userId: user.id,
      items: items.map(i => ({ menuItemId: i.menuItem.id, quantity: i.quantity })),
      deliveryType: 'pickup', // for demo – could be a UI selection
      address: null
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');
      setOrderId(data.orderId);
      clear();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {orderId ? (
        <p className="text-green-600">Order placed! Your order ID is {orderId}.</p>
      ) : (
        <>
          <p>{items.length} item(s) in your cart.</p>
          <button
            className="rounded bg-gold-600 px-4 py-2 text-white hover:bg-gold-700 disabled:opacity-50"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing…' : 'Place Order'}
          </button>
        </>
      )}
    </section>
  );
}
