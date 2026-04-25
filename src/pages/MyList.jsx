import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ThumbnailCard from '../components/ThumbnailCard'
import TitleModal from '../components/TitleModal'
import { useList } from '../context/useList'

export default function MyList({ allTitles, loading, error }) {
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') ?? ''
  const [selectedTitle, setSelectedTitle] = useState(null)
  const { myListIds, toggleMyList, isInMyList } = useList()

  const myTitles = allTitles.filter((title) => myListIds.includes(title.id))
  const filteredTitles = myTitles.filter((title) => {
    if (!searchQuery.trim()) {
      return true
    }

    const query = searchQuery.toLowerCase()
    return (
      title.title.toLowerCase().includes(query) ||
      title.genres.some((genre) => genre.toLowerCase().includes(query))
    )
  })

  return (
    <>
      <section className="relative overflow-hidden bg-zinc-950 px-4 pb-14 pt-36 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.28),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)]" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">My List</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Saved titles for quick access</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            This page demonstrates local state management with Context and localStorage. Add a
            show or movie from any page and it will appear here instantly.
          </p>
        </div>
      </section>

      <main className="px-4 py-10 md:px-10">
        {loading && !allTitles.length && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-3xl font-semibold text-white">Loading your list...</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              The app is still loading the free API data.
            </p>
          </div>
        )}

        {error && !allTitles.length && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-3xl font-semibold text-white">Could not load list data</h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{error}</p>
          </div>
        )}

        {filteredTitles.length ? (
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
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-3xl font-semibold text-white">
              {myTitles.length ? 'No results in My List' : 'Your list is empty'}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              {myTitles.length
                ? `Nothing matched “${searchQuery}”. Try a broader search.`
                : 'Hover over any card and press the plus button, or open a title and add it from the modal.'}
            </p>
          </div>
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
