import { supabase } from '@/lib/supabaseClient';
import type { Order } from '@yairi/database';
import { useEffect, useState } from 'react';

export function useOrders(userId: string) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // initial fetch
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) setOrders(data as any);
      });

    // realtime subscription
    const subscription = supabase
      .channel('public:orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${userId}` },
        payload => {
          const newOrder = payload.new as Order;
          setOrders(prev => {
            const filtered = prev.filter(o => o.id !== newOrder.id);
            return [...filtered, newOrder];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return orders;
}
