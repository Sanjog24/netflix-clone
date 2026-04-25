import { CheckIcon, GridIcon, InfoIcon, ListIcon, PlayIcon, PlusIcon, SpeakerIcon } from './Icons'

export default function HeroSection({
  title,
  pageTitle,
  genres = [],
  selectedGenre = 'All',
  onGenreChange,
  viewMode,
  onViewModeChange,
  onOpenTitle,
  onToggleList,
  isInList,
}) {
  const isBrowsePage = Boolean(pageTitle)

  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-zinc-950 pt-28 text-white md:min-h-[78vh]">
      <img
        src={title.banner}
        alt={title.title}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

      {isBrowsePage && (
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-4 pt-3 md:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{pageTitle}</h1>
            <label className="flex items-center gap-3 border border-white/35 bg-black/35 px-4 py-2 text-sm font-medium">
              <span>Genres</span>
              <select
                value={selectedGenre}
                onChange={(event) => onGenreChange?.(event.target.value)}
                className="bg-transparent text-sm text-white outline-none"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-zinc-900">
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewModeChange?.('rows')}
              className={`border px-4 py-3 transition ${
                viewMode === 'rows'
                  ? 'border-white bg-white/10 text-white'
                  : 'border-white/30 text-zinc-300 hover:text-white'
              }`}
            >
              <ListIcon />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange?.('grid')}
              className={`border px-4 py-3 transition ${
                viewMode === 'grid'
                  ? 'border-white bg-white/10 text-white'
                  : 'border-white/30 text-zinc-300 hover:text-white'
              }`}
            >
              <GridIcon />
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 flex min-h-[65vh] items-end px-4 pb-14 md:px-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-lg font-semibold tracking-[0.35em] text-red-500">NETFLIX</p>
          <h2 className="max-w-xl text-5xl font-black uppercase tracking-tight md:text-7xl">
            {title.logo ?? title.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-200 md:text-lg">
            {title.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
            <span>{title.year}</span>
            <span className="rounded border border-white/30 px-2 py-0.5">{title.rating}</span>
            <span>{title.seasons ? `${title.seasons} Seasons` : title.duration}</span>
            <span className="rounded border border-white/20 px-2 py-0.5 text-xs uppercase text-zinc-300">
              HD
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-zinc-200"
            >
              <PlayIcon filled className="h-5 w-5" />
              Play
            </button>
            <button
              type="button"
              onClick={() => onOpenTitle(title)}
              className="inline-flex items-center gap-2 rounded bg-zinc-500/60 px-6 py-3 text-base font-semibold text-white transition hover:bg-zinc-400/70"
            >
              <InfoIcon className="h-5 w-5" />
              More Info
            </button>
            <button
              type="button"
              onClick={() => onToggleList(title.id)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white transition hover:border-white"
              aria-label={isInList ? 'Remove from My List' : 'Add to My List'}
            >
              {isInList ? <CheckIcon /> : <PlusIcon />}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-4 z-10 hidden items-center gap-4 md:flex md:right-10">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white"
          aria-label="Audio controls"
        >
          <SpeakerIcon />
        </button>
        <span className="border-l-2 border-zinc-400 pl-4 text-xl text-zinc-100">{title.rating}</span>
      </div>
    </section>
  )
}
