"use client"

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { LinkButton, Button } from '../server-components'
import { UserMenu, LanguageSwitcher } from '../client-components'
import { NavbarSkeleton } from '../scheletons'
import { CAIcon, LanguageIcon } from '@/assets/Icons'
import { NavBarProps } from '../types'
import { useIsOpen } from '@/hooks/useIsOpen'
import { useTheme } from '@/hooks/useTheme'

export function Navbar({ initialData }: NavBarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { isOpen, Toggle } = useIsOpen()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!initialData) {
    return <NavbarSkeleton />
  }

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300 py-3 backdrop-blur-xl bg-page/80 border-b border-border-subtle content-container"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <LinkButton
          link='#top'
          className='h-9 w-auto md:h-10 text-main transition-colors hover:opacity-80'
          svg={CAIcon}
        />

        <nav className="hidden lg:flex items-center gap-1">
          {initialData.links.map((link) => (
            <LinkButton
              key={link.id}
              link={link.id}
              txt={link.name}
              className="px-3 py-2 font-sans text-[13px] font-medium text-body hover:text-main hover:bg-hover rounded-md transition-all duration-200"
              txtcolor='text-[13px]!'
            />
          ))}
        </nav>

        <div className="relative flex gap-2">

          <LinkButton
            link="#contacto"
            txtcolor="text-page text-[12px]!"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-accent hover:bg-accent-alt text-page text-[12px] font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            txt={initialData.button}
          />

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Cambiar tema"
              className="p-2 text-body hover:text-main hover:bg-hover rounded-md transition-all duration-200 border border-border-subtle"
            >
              {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          )}

          <div className="relative">
            <Button
              className=' p-2 text-body hover:text-main hover:bg-hover rounded-md transition-all duration-200 border border-border-subtle'
              fillcolor='size-5!'
              onClick={Toggle}
              svg={LanguageIcon}
            />

            {isOpen && (
              <div className='absolute right-0 top-full mt-2 p-2 backdrop-blur-xl bg-page/80 rounded-md border border-border-subtle h-auto w-21 flex flex-col items-start justify-start z-50'>
                <LanguageSwitcher />
              </div>
            )}
          </div>


          <div className='flex items-center'>
            <UserMenu />
          </div>


        </div>
      </div>
    </header>
  )
}
