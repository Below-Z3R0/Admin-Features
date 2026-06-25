"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LinkButton } from '@/components/server-components';
import { CAIcon } from '@/assets/Icons';
import { NavBarProps } from '@/components/types';

interface AdminNavbarProps extends Pick<NavBarProps, 'initialData'> {
  children: React.ReactNode;
}

export function AdminNavbar({ initialData, children }: AdminNavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLang = searchParams.get('lang') || 'es';
  const isEditing = pathname === '/admin/edit';
  const langSuffix = `?lang=${currentLang}`;

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-all duration-300 py-3 backdrop-blur-xl bg-page/80 border-b border-border-subtle content-container">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            href={`/admin${langSuffix}`}
            className="flex items-center gap-2 text-sm font-semibold text-main hover:text-accent transition-colors"
          >
            <CAIcon className="h-7 w-auto md:h-8 text-main transition-colors hover:opacity-80" />
            <span className="hidden sm:inline">← Volver al preview</span>
            <span className="sm:hidden">← Preview</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {initialData?.links.map((link) => (
              <LinkButton
                key={link.id}
                link={link.id}
                txt={link.name}
                className="px-3 py-2 font-sans text-[13px] font-medium text-body hover:text-main hover:bg-hover rounded-md transition-all duration-200"
                txtcolor="text-[13px]!"
              />
            ))}
          </nav>

          <div className="relative flex gap-2">
            {!isEditing && (
              <Link
                href={`/admin/edit${langSuffix}`}
                className="hidden sm:inline-flex items-center px-3 py-2 bg-accent hover:bg-accent-alt text-page text-xs font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ✏️ Modo edición
              </Link>
            )}

            <Link
              href="/"
              target="_blank"
              className="px-3 py-2 text-xs text-body hover:text-main hover:bg-hover rounded-md transition-all duration-200"
            >
              Ver sitio público ↗
            </Link>

            {!isEditing && initialData && (
              <LinkButton
                link="#contacto"
                txt={initialData.button}
                txtcolor="text-page text-[12px]!"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-accent hover:bg-accent-alt text-page text-[12px] font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
              />
            )}
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
