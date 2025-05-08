import { LoginModule } from '@/modules/auth/login/login-module'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_auth-layout/login')({
  component: LoginModule,
})
