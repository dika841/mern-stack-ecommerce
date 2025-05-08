import { useAuth } from '@/contexts/providers/use-auth'
import { userData } from '@/hooks/utils/user-data'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard/')({
  component: RouteComponent,
  beforeLoad: () => {
    const { token } = useAuth()
    const data = userData()
    if (!token && data.user?.role !== 'admin') return false
  },
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
