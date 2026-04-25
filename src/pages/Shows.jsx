import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { filterTitles, getGenres } from '../api/freeApis'
import ContentRow from '../components/ContentRow'
import HeroSection from '../components/HeroSection'
import ThumbnailCard from '../components/ThumbnailCard'
import TitleModal from '../components/TitleModal'
import { useList } from '../context/useList'

function makeShowRows(filteredShows) {
  return [
    { key: 'all-shows', title: 'Popular TV Shows', items: filteredShows.slice(0, 6) },
    {
      key: 'funny',
      title: 'Comedy and Easy Watch',
      items: filteredShows.filter((item) => item.genres.includes('Comedy')),
    },
    {
      key: 'action',
      title: 'Action and Adventure',
      items: filteredShows.filter((item) =>
        item.genres.some((genre) => ['Action', 'Adventure', 'Fantasy'].includes(genre)),
      ),
    },
    {
      key: 'anime',
      title: 'Anime Corner',
      items: filteredShows.filter((item) => item.genres.includes('Anime')),
    },
    { key: 'top10', title: 'Top 10 Shows on This Clone', items: filteredShows.slice(0, 10), variant: 'top10' },
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

export default function Shows({ shows, loading, error }) {
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') ?? ''
  const [selectedTitle, setSelectedTitle] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [viewMode, setViewMode] = useState('rows')
  const { myListIds, toggleMyList, isInMyList } = useList()
  const genres = getGenres(shows)
  const filteredTitles = filterTitles(shows, searchQuery, selectedGenre)
  const featuredTitle = filteredTitles[0] ?? shows[0] ?? null
  const rows = makeShowRows(filteredTitles)

  if (loading && !featuredTitle) {
    return <PageMessage title="Loading shows..." text="Fetching TV shows from the free TVMaze API." />
  }

  if (error && !featuredTitle) {
    return <PageMessage title="Could not load shows" text={error} />
  }

  return (
    <>
      {featuredTitle && (
        <HeroSection
          title={featuredTitle}
          pageTitle="TV Shows"
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenTitle={setSelectedTitle}
          onToggleList={toggleMyList}
          isInList={isInMyList(featuredTitle.id)}
        />
      )}

      <main className="-mt-24 pb-16">
        {viewMode === 'rows' ? (
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
          <section className="px-4 py-8 md:px-10">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">Browse Shows</h2>
              <p className="text-sm text-zinc-400">{filteredTitles.length} results</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredTitles.map((item) => (
                <ThumbnailCard
                  key={item.id}
                  title={item}
                  onOpen={setSelectedTitle}
                  onToggleList={toggleMyList}
                  isInList={myListIds.includes(item.id)}
                />
              ))}
            </div>
          </section>
        )}

        {!filteredTitles.length && (
          <PageMessage title="No shows found" text="Try a different genre or remove the search text." />
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
