'use client'
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'
import { getSiteURL } from '@/utils/getSiteURL';
import { data } from '@/staticdata/logindata';
import type { otherLogin } from '@/components/types';
import { ErrorPage } from '@/components/client-components';
import { LoginInput, Span } from '@/components/server-components';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsOpen } from '@/hooks/useIsOpen';
import { GoogleIcon, CAIcon } from '@/assets/Icons';
import { type signIn, type signUp, signInSchema, signUpSchema } from '@/schema/form.Schema';
import { Mail, Lock, User, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

function navigateAfterAuth() {
  window.location.assign(`${getSiteURL()}/auth/route`);
}

export default function LoginPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getSiteURL()}/auth/callback`,
      },
    })
  }
  const handleEmailSingIn = async (formData: signIn) => {
    setLoading(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })
    if (error) {
      setAuthError(`Error al iniciar sesion: ${error.message}`)
    } else {
      navigateAfterAuth();
    }
    setLoading(false)
  }

  const handleEmailSingUp = async (formData: signUp) => {
    setLoading(true)
    setAuthError(null)
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          display_name: formData.name,
        },
        emailRedirectTo: `${getSiteURL()}/auth/callback`,
      }
    })
    if (error) {
      setAuthError(`Error al crear el usuario: ${error.message}`)
    } else {
      navigateAfterAuth();
    }
    setLoading(false)
  }

  const otherSignIn: otherLogin[] = [
    { name: 'Google', action: handleGoogleLogin },
  ];
  const otherSignUp: otherLogin[] = [
    { name: 'Google', action: handleGoogleLogin },
  ];


  const [authError, setAuthError] = useState<string | null>(null)
  const { Toggle, isOpen } = useIsOpen();
  const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm<signUp>({ mode: "onChange", resolver: zodResolver(signUpSchema) });
  const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm<signIn>({ mode: "onChange", resolver: zodResolver(signInSchema) });

  if (authError) {
    return <ErrorPage message={authError} onRetry={() => setAuthError(null)} />
  }

  return (
    <main className="min-h-screen w-full bg-page flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-mid/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4 transition-opacity hover:opacity-80">
            <CAIcon className="h-12 w-auto text-main" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-mid bg-card/50 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-body">
              {isOpen ? 'Crea tu cuenta' : 'Bienvenido de vuelta'}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border-mid bg-card/80 backdrop-blur-xl shadow-lg p-6 md:p-8">

          {isOpen ? (
            <form className="flex flex-col gap-5" onSubmit={handleSubmitSignUp(handleEmailSingUp)}>
              <header className="text-center mb-2">
                <h1 className="text-2xl font-sans font-bold text-main mb-1">
                  {data.signUp.title}
                </h1>
                <p className="text-sm text-body">
                  {data.signIn.panel.paragraph}
                </p>
              </header>

              {otherSignUp.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={item.action}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border-mid rounded-md bg-page hover:bg-hover transition-colors text-sm font-medium text-main"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Continuar con {item.name}
                </button>
              ))}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border-mid" />
                <Span className="text-[11px] uppercase tracking-wider text-muted font-medium" txt={data.signUp.othermethod} />
                <div className="flex-1 h-px bg-border-mid" />
              </div>

              <div className='flex flex-col gap-3.5'>
                {data.signUp.input.map((item) => {
                  const Icon = item.type === 'email' ? Mail : item.type === 'password' ? Lock : User;
                  return (
                    <div key={item.id} className="relative">
                      <Icon className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none z-10" />
                      <LoginInput
                        type={item.type}
                        placeholder={item.placeholder}
                        id={item.id}
                        issues={errorsSignUp[item.id as keyof signUp]?.message}
                        {...registerSignUp(item.id as keyof signUp)}
                      />
                    </div>
                  );
                })}
              </div>

              <button
                type='submit'
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    {data.signUp.button}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-body mt-2">
                Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={Toggle}
                  className="text-accent hover:text-accent-alt font-medium transition-colors"
                >
                  {data.signIn.button}
                </button>
              </p>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmitSignIn(handleEmailSingIn)}>
              <header className="text-center mb-2">
                <h1 className="text-2xl font-sans font-bold text-main mb-1">
                  {data.signIn.title}
                </h1>
                <p className="text-sm text-body">
                  {data.signUp.panel.paragraph}
                </p>
              </header>

              {otherSignIn.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={item.action}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border-mid rounded-md bg-page hover:bg-hover transition-colors text-sm font-medium text-main"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Continuar con {item.name}
                </button>
              ))}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border-mid" />
                <Span className="text-[11px] uppercase tracking-wider text-muted font-medium" txt={data.signIn.othermethod} />
                <div className="flex-1 h-px bg-border-mid" />
              </div>

              <div className='flex flex-col gap-3.5'>
                {data.signIn.input.map((item) => {
                  const Icon = item.type === 'email' ? Mail : Lock;
                  return (
                    <div key={item.id} className="relative">
                      <Icon className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none z-10" />
                      <LoginInput
                        type={item.type}
                        placeholder={item.placeholder}
                        id={item.id}
                        issues={errorsSignIn[item.id as keyof signIn]?.message}
                        {...registerSignIn(item.id as keyof signIn)}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-accent hover:text-accent-alt transition-colors font-medium"
                >
                  {data.signIn.recovery}
                </button>
              </div>

              <button
                type='submit'
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed text-page text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    {data.signIn.button}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-body mt-2">
                No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={Toggle}
                  className="text-accent hover:text-accent-alt font-medium transition-colors"
                >
                  {data.signIn.panel.toggle}
                </button>
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Al continuar, aceptas nuestros terminos y condiciones
        </p>
      </div>
    </main>
  )
}
