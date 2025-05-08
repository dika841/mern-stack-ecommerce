import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_auth-layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="w-full min-h-screen flex">
      <div className="w-1/2 bg-cover">
        <img
          src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <Outlet />
      </div>
    </section>
  )
}
