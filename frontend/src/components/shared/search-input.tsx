import type React from 'react'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchComponentProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export const SearchComponent = ({
  placeholder = 'Search...',
  onSearch = () => {},
}: SearchComponentProps) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full  items-center space-x-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8 bg-white w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button
        variant={'secondary'}
        type="submit"
        className="text-primary bg-white"
      >
        Search
      </Button>
    </form>
  )
}
