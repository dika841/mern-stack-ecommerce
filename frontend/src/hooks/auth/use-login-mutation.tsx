import { login } from '@/api/auth/auth-api'
import type { TLoginRequest } from '@/api/auth/type'
import { useAuth } from '@/contexts/providers/use-auth'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation = () => {
  const { signIn } = useAuth()
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: TLoginRequest) => await login(payload),
    onSuccess: async (data) => {
      const isToken = data.access_token
      signIn(isToken as string)
    },
  })
}
