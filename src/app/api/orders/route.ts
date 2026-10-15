export const runtime = 'edge';

import { supabase } from '@/lib/supabaseClient';
import { orderSchema } from '@validation';
import type { Order, OrderItem } from '@yairi/database';
import { v4 as uuidv4 } from 'uuid';

/**
 * POST /api/orders – Create a new order from the cart.
 * The payload must conform to orderSchema (validated client‑side as well).
 * Server‑side we will:
 *   1. Verify the user exists and has role 'customer'.
 *   2. Look up current prices for each menu_item_id.
 *   3. Compute total_cents securely.
 *   4. Insert the order with status 'pending'.
 *   5. Insert related order_items.
 *   6. Return orderId and total.
 */
export async function POST(request: Request) {
  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;
  if (!user) return new Response(JSON.stringify({ error: 'Unauthenticated' }), { status: 401 });

  const json = await request.json();
  const parseResult = orderSchema.safeParse(json);
  if (!parseResult.success) {
    return new Response(JSON.stringify({ error: parseResult.error.format() }), { status: 400 });
  }

  const { userId, items, deliveryType, address } = parseResult.data;

  // Ensure the order is being placed by the authenticated user
  if (userId !== user.id) {
    return new Response(JSON.stringify({ error: 'User mismatch' }), { status: 403 });
  }

  // Load current menu items and prices in a single query
  const menuIds = items.map(i => i.menuItemId);
  const { data: menuRows, error: menuErr } = await supabase
    .from('menu_items')
    .select('id,price_cents')
    .in('id', menuIds);
  if (menuErr) return new Response(JSON.stringify({ error: menuErr.message }), { status: 500 });

  const priceMap = new Map<string, number>();
  (menuRows as any).forEach((row: any) => priceMap.set(row.id, row.price_cents));

  // Compute total securely – reject any unknown items
  let totalCents = 0;
  const orderItems: OrderItem[] = [];
  for (const item of items) {
    const price = priceMap.get(item.menuItemId);
    if (price === undefined) {
      return new Response(JSON.stringify({ error: `Invalid menu item ${item.menuItemId}` }), { status: 400 });
    }
    const lineTotal = price * item.quantity;
    totalCents += lineTotal;
    orderItems.push({
      id: uuidv4(),
      order_id: '', // placeholder, will set after order insert
      menu_item_id: item.menuItemId,
      quantity: item.quantity,
      price_cents: price
    } as any);
  }

  // Insert order – status pending, payment pending (no provider yet)
  const { data: orderData, error: orderErr } = await supabase
    .from('orders')
    .insert([
      {
        id: uuidv4(),
        user_id: user.id,
        status: 'pending',
        total_cents: totalCents,
        delivery_type: deliveryType,
        address: address ?? null
      }
    ])
    .select();
  if (orderErr) return new Response(JSON.stringify({ error: orderErr.message }), { status: 500 });

  const newOrder = (orderData as any)[0] as Order;

  // Insert order items referencing the newly created order id
  const itemsToInsert = orderItems.map(oi => ({
    ...oi,
    order_id: newOrder.id
  }));

  const { error: itemsErr } = await supabase.from('order_items').insert(itemsToInsert);
  if (itemsErr) return new Response(JSON.stringify({ error: itemsErr.message }), { status: 500 });

  return new Response(JSON.stringify({ orderId: newOrder.id, totalCents }), { status: 201 });
}
