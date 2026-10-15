import RequireAuth from '@ui/components/RequireAuth';
import Menu from '@/components/Menu';

export default function MenuPage() {
  return (
    <RequireAuth>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gold-600">Our Menu</h1>
        <Menu />
      </main>
    </RequireAuth>
  );
}
