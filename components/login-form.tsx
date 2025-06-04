'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { IconLogo } from '@/components/ui/icons'
import { cn } from '@/lib/utils/index'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signIn('azure-ad', {
        callbackUrl: '/'
      })
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn('w-full max-w-md', className)} {...props}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <IconLogo className="size-8" />
        </div>
        <CardTitle className="text-2xl text-center">Bem-vindo ao pravaler.ai</CardTitle>
        <CardDescription className="text-center">
          Faça login com sua conta Microsoft
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar com Microsoft'}
          </Button>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
