import { supabase } from '@/lib/supabaseClient';
import type { MenuItem } from '@yairi/database';
import { useEffect, useState } from 'react';

export function useMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('*')
      .then(({ data }) => {
        if (data) setMenu(data as any);
      });
  }, []);

  return menu;
}
