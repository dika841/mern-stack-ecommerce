import { LandingModule } from '@/modules/landing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: LandingModule,
})
