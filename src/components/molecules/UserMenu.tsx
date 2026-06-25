'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { Button } from '../server-components'
import { useIsOpen } from '@/hooks/useIsOpen'
import { LogAutIcon } from '@/assets/Icons'

export function UserMenu() {
    const router = useRouter()
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [mounted, setMounted] = useState(false)
    const { isOpen, Toggle } = useIsOpen()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)

        const loadUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user ?? null)
        }

        loadUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            },
        )

        return () => {
            subscription.unsubscribe()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogin = () => {
        router.push('/login')
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.refresh()
    }

    if (!mounted) {
        return <div className="size-10" aria-hidden="true" />
    }

    if (user) {
        return (
            <div className='fixed flex flex-col justify-center items-center'>
                <Button
                    img="/avatars/default.svg"
                    alt="Perfil de usuario"
                    onClick={Toggle}
                    aria-label="User"
                    className="size-10 rounded-full overflow-hidden p-0 border border-border-mid hover:border-accent transition-all duration-300 cursor-pointer"
                />
                {isOpen && (
                    <Button
                        alt="Perfil de usuario"
                        onClick={handleSignOut}
                        aria-label="Cerrar sesión"
                        svg={LogAutIcon}
                        title={user.email ?? 'Cerrar sesión'}
                        className="fixed mt-23 w-15 h-10 rounded-2xl p-1.3 border border-border-mid hover:border-accent transition-all duration-300 cursor-pointer justify-center items-center"
                    />
                )}
            </div>
        )
    }

    return (
        <Button
            txt="Iniciar sesión"
            onClick={handleLogin}
            txtcolor="text-page! text-[11px]!"
            className="px-5 py-2.5 bg-main hover:opacity-80 uppercase tracking-[0.12em] font-medium rounded-sm transition-opacity text-[11px] shadow-sm cursor-pointer"
        />
    )
}
