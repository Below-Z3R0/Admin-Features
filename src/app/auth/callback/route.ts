import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getSiteURL } from '@/utils/getSiteURL';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  // Default '/auth/route' ensures role-based redirect (admin → /admin).
  const next = searchParams.get('next') ?? '/auth/route';
  const origin = getSiteURL();

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
