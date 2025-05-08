import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type Resolver } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useLoginMutation } from '@/hooks/auth/use-login-mutation'
import { useAuth } from '@/contexts/providers/use-auth'
import { useLayoutEffect, useNavigate } from '@tanstack/react-router'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
})
type LoginFormValues = z.infer<typeof loginSchema>
export const LoginModule = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as Resolver<z.infer<typeof loginSchema>>,
  })
  const { mutate, isPending } = useLoginMutation()
  const onSubmit = form.handleSubmit((data) => {
    mutate(data)
  })

  useLayoutEffect(() => {
    if (token) {
      navigate({ to: '/dashboard' })
    }
  }, [token])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="example@me.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'default'} type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button variant={'link'}>Don't have an account ?</Button>
        <Button variant={'link'}>Forgot Password</Button>
      </CardFooter>
    </Card>
  )
}
