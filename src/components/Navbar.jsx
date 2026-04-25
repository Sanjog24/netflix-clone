import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BellIcon, ChevronDownIcon, SearchIcon } from './Icons'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shows', to: '/shows' },
  { label: 'Movies', to: '/movies' },
  { label: 'My List', to: '/mylist' },
]

const profileLinks = [
  'Manage Profiles',
  'Account',
  'Help Centre',
  'Sign out',
]

function buildSearch(pathname, query) {
  if (!query.trim()) {
    return pathname
  }

  return `${pathname}?q=${encodeURIComponent(query.trim())}`
}

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentQuery = new URLSearchParams(location.search).get('q') ?? ''
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('click', closeMenu)

    return () => window.removeEventListener('click', closeMenu)
  }, [])

  const updateSearch = (value) => {
    navigate(buildSearch(location.pathname, value), { replace: true })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-10">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="text-3xl font-black tracking-[0.2em] text-red-600">
            NETFLIX
          </NavLink>
          <nav className="hidden items-center gap-5 text-sm text-zinc-300 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={buildSearch(item.to, currentQuery)}
                className={({ isActive }) =>
                  isActive ? 'font-semibold text-white' : 'transition hover:text-white'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <label className="hidden items-center gap-2 rounded border border-white/20 bg-black/55 px-3 py-2 text-sm text-zinc-300 md:flex">
            <SearchIcon className="h-4 w-4" />
            <input
              value={currentQuery}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search titles, genres..."
              className="w-52 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </label>

          <button
            type="button"
            className="rounded-full p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          <span className="hidden text-sm text-zinc-200 sm:inline">Children</span>
          <div className="relative">
            <div className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              1
            </div>
            <BellIcon />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setMenuOpen((current) => !current)
              }}
              className="flex items-center gap-2 rounded-md p-1 transition hover:bg-white/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white shadow-lg">
                S
              </div>
              <ChevronDownIcon className="hidden h-4 w-4 text-zinc-300 md:block" />
            </button>

            {menuOpen && (
              <div
                onClick={(event) => event.stopPropagation()}
                className="absolute right-0 top-14 w-52 rounded-md border border-white/10 bg-[#111111] p-2 shadow-2xl"
              >
                <div className="mb-2 border-b border-white/10 pb-2">
                  <p className="text-sm font-semibold text-white">Spider20436</p>
                  <p className="text-xs text-zinc-400">Student profile</p>
                </div>
                <div className="space-y-1">
                  {profileLinks.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="block w-full rounded px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <input
          value={currentQuery}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder="Search titles, genres..."
          className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>
    </header>
  )
}
