import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AdminNavbar } from '@/components-admin';
import { getNavbarData } from '@/services/navbar.data.service';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  const navbarData = await getNavbarData('es');

  return (
    <AdminNavbar initialData={navbarData}>
      {children}
    </AdminNavbar>
  );
}
