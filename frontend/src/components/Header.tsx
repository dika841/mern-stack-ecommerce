import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { SectionLayout } from './section-layout'
import { SearchComponent } from './shared/search-input'
import { ShoppingBag } from 'lucide-react'
import { Separator } from './ui/separator'
import { TooltipWrap } from './shared/tooltips-wraper'

export default function Header() {
  return (
    <header className="p-2 flex flex-col gap-2  bg-primary text-white min-h-40 px-16">
      <nav className="flex flex-row justify-between w-full items-center text-sm">
        <div className="flex flex-row h-5 gap-x-2">
          <div className="">
            <Link to="/">Home</Link>
          </div>
          <Separator orientation="vertical" />

          <div className="flex items-center  gap-x-3">
            <p>Follow us : </p>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-instagram-icon lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-facebook-icon lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex gap-x-3 h-7 flex-row">
          <Button variant={'link'} className="text-white">
            Notifications
          </Button>

          <Button variant={'link'} className="text-white">
            Help
          </Button>

          <Button variant={'link'} className="text-white">
            Login
          </Button>

          <Button variant={'link'} className="text-white">
            Register
          </Button>
        </div>
      </nav>
      <SectionLayout>
        <div className="flex justify-around items-center gap-x-10">
          <figure>
            <figcaption className="text-2xl font-bold">Kalevo</figcaption>
          </figure>
          <SearchComponent />
          <TooltipWrap title="Cart">
            <ShoppingBag strokeWidth={1.25} size={32} />
          </TooltipWrap>
        </div>
      </SectionLayout>
    </header>
  )
}
