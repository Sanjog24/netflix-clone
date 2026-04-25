import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { filterTitles } from '../api/freeApis'
import ContentRow from '../components/ContentRow'
import HeroSection from '../components/HeroSection'
import TitleModal from '../components/TitleModal'
import { useList } from '../context/useList'

function makeHomeRows(filteredShows, filteredMovies) {
  const allTitles = [...filteredShows, ...filteredMovies]

  return [
    { key: 'top-picks', title: "Today's Top Picks for You", items: allTitles.slice(0, 6) },
    { key: 'continue', title: 'Continue Watching', items: filteredShows.slice(1, 6) },
    {
      key: 'anime',
      title: 'Anime and Action Picks',
      items: filteredShows.filter((item) =>
        item.genres.some((genre) => ['Anime', 'Action', 'Fantasy'].includes(genre)),
      ),
    },
    { key: 'movies', title: 'Movie Night', items: filteredMovies.slice(0, 6) },
    { key: 'top10', title: 'Top 10 on This Clone', items: allTitles.slice(0, 10), variant: 'top10' },
  ].filter((row) => row.items.length > 0)
}

function PageMessage({ title, text }) {
  return (
    <div className="px-4 py-24 text-center text-zinc-300 md:px-10">
      <p className="text-2xl font-semibold text-white">{title}</p>
      <p className="mt-3 text-zinc-400">{text}</p>
    </div>
  )
}

export default function Home({ shows, movies, loading, error }) {
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') ?? ''
  const [selectedTitle, setSelectedTitle] = useState(null)
  const { myListIds, toggleMyList, isInMyList } = useList()
  const filteredShows = filterTitles(shows, searchQuery)
  const filteredMovies = filterTitles(movies, searchQuery)
  const featuredTitle = filteredShows[0] ?? filteredMovies[0] ?? null
  const rows = makeHomeRows(filteredShows, filteredMovies)

  if (loading && !featuredTitle) {
    return <PageMessage title="Loading clone data..." text="Fetching shows and movies from free APIs." />
  }

  if (error && !featuredTitle) {
    return <PageMessage title="Could not load content" text={error} />
  }

  return (
    <>
      {featuredTitle && (
        <HeroSection
          title={featuredTitle}
          onOpenTitle={setSelectedTitle}
          onToggleList={toggleMyList}
          isInList={isInMyList(featuredTitle.id)}
        />
      )}

      <main className="-mt-24 pb-16">
        {rows.length ? (
          rows.map((section) => (
            <ContentRow
              key={section.key}
              title={section.title}
              items={section.items}
              variant={section.variant ?? 'standard'}
              onOpenTitle={setSelectedTitle}
              onToggleList={toggleMyList}
              myListIds={myListIds}
            />
          ))
        ) : (
          <PageMessage
            title={`No titles matched "${searchQuery}"`}
            text="Try searching for a genre like anime, thriller, or comedy."
          />
        )}
      </main>

      <TitleModal
        title={selectedTitle}
        isOpen={Boolean(selectedTitle)}
        onClose={() => setSelectedTitle(null)}
        onToggleList={toggleMyList}
        isInList={selectedTitle ? isInMyList(selectedTitle.id) : false}
      />
    </>
  )
}
