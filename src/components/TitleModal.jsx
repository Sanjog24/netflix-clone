import { useEffect } from 'react'
import { CheckIcon, PlayIcon, PlusIcon, SpeakerIcon, XIcon } from './Icons'

export default function TitleModal({ title, isOpen, onClose, onToggleList, isInList }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !title) {
    return null
  }

  const hasEpisodes = Boolean(title.episodes?.length)
  const season = 'Season 1'

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/80 p-3 md:p-10">
      <div className="relative my-12 w-full max-w-5xl overflow-hidden rounded-xl bg-[#181818] text-white shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
          aria-label="Close modal"
        >
          <XIcon />
        </button>

        <div className="relative h-[280px] md:h-[430px]">
          <img src={title.banner} alt={title.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />
          <div className="absolute bottom-8 left-5 right-5 md:left-10 md:right-10">
            <p className="mb-3 text-base font-semibold tracking-[0.35em] text-red-500">NETFLIX</p>
            <h2 className="max-w-2xl text-4xl font-black uppercase md:text-6xl">
              {title.logo ?? title.title}
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-base font-semibold text-black"
              >
                <PlayIcon filled className="h-5 w-5" />
                {hasEpisodes ? 'Next Episode' : 'Play'}
              </button>
              <button
                type="button"
                onClick={() => onToggleList(title.id)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white"
              >
                {isInList ? <CheckIcon /> : <PlusIcon />}
              </button>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white"
                aria-label="Volume control"
              >
                <SpeakerIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-scrollbar max-h-[70vh] overflow-y-auto px-5 pb-10 pt-8 md:px-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm md:text-base">
                <span className="font-semibold text-emerald-400">
                  {hasEpisodes ? `${title.seasons} Seasons` : title.duration}
                </span>
                <span>{title.year}</span>
                <span className="rounded border border-white/25 px-2 py-0.5">{title.rating}</span>
                <span className="rounded border border-white/20 px-2 py-0.5 text-xs uppercase text-zinc-300">
                  HD
                </span>
              </div>

              <p className="text-base leading-8 text-zinc-200 md:text-lg">{title.description}</p>
            </div>

            <div className="space-y-4 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-500">Cast:</span> {title.cast.join(', ')}
              </p>
              <p>
                <span className="text-zinc-500">Genres:</span> {title.genres.join(', ')}
              </p>
              <p>
                <span className="text-zinc-500">This title is:</span> {title.tags.join(', ')}
              </p>
            </div>
          </div>

          {hasEpisodes ? (
            <section className="mt-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-white">Episodes</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {season}: <span className="rounded border border-white/15 px-2 py-1">{title.rating}</span>{' '}
                    language
                  </p>
                </div>
                <label className="flex items-center gap-3 rounded border border-white/20 bg-white/5 px-4 py-3 text-sm">
                  <span>{season}</span>
                  <select value={season} className="bg-transparent text-white outline-none">
                    <option value="Season 1" className="bg-zinc-900">
                      Season 1
                    </option>
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                {title.episodes.map((episode) => (
                  <div
                    key={episode.number}
                    className="grid gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[56px_160px_minmax(0,1fr)_70px]"
                  >
                    <div className="flex items-center justify-center text-3xl text-zinc-400">
                      {episode.number}
                    </div>
                    <img
                      src={episode.still}
                      alt={episode.title}
                      className="h-24 w-full rounded object-cover"
                    />
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-xl font-semibold text-white">{episode.title}</h4>
                        <span className="text-zinc-300">{episode.duration}</span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-zinc-300">{episode.description}</p>
                    </div>
                    <div className="hidden items-center justify-center text-zinc-400 md:flex">
                      {episode.duration}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="mt-10 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <h3 className="text-2xl font-semibold text-white">About this title</h3>
              <p className="mt-3 leading-7 text-zinc-300">
                We are using OMDb for this student project. OMDb gives simple details like poster,
                plot, cast, genre, runtime, and seasons, which is enough for a clean Netflix-style
                clone. It does not give us a full episode list here in the same simple call, so
                this modal focuses on the main information instead.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
