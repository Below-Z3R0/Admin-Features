import { redirect } from 'next/navigation';
import { isCurrentUserAdmin } from '@/services/sections/content.editor.service';

export default async function PostLoginRoute() {
  const isAdmin = await isCurrentUserAdmin();

  if (isAdmin) {
    redirect('/admin');
  }

  redirect('/');
}
