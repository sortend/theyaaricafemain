import { createContext, useContext, useState, ReactNode } from 'react';
import type { MenuItem } from '@yairi/database';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (menuItem: MenuItem, qty?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (menuItem: MenuItem, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(i =>
          i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { menuItem, quantity: qty }];
    });
  };

  const removeItem = (menuItemId: string) => {
    setItems(prev => prev.filter(i => i.menuItem.id !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.menuItem.id === menuItemId ? { ...i, quantity: qty } : i))
    );
  };

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
