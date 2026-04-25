import { CheckIcon, InfoIcon, PlayIcon, PlusIcon } from './Icons'

function clampStyle(lines) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
    overflow: 'hidden',
  }
}

export default function ThumbnailCard({
  title,
  index = 0,
  variant = 'standard',
  onOpen,
  onToggleList,
  isInList,
}) {
  const isTop10 = variant === 'top10'
  const cardWidth = isTop10 ? 'w-[220px] md:w-[240px]' : 'w-[240px] md:w-[270px]'

  return (
    <article
      className={`group relative shrink-0 ${cardWidth} cursor-pointer overflow-visible`}
      onClick={() => onOpen(title)}
    >
      {isTop10 && (
        <span className="pointer-events-none absolute -left-1 bottom-0 z-0 text-[10rem] font-black leading-none text-zinc-900 stroke-white/10 [text-shadow:0_0_1px_rgba(255,255,255,0.3)] md:text-[12rem]">
          {index + 1}
        </span>
      )}

      <div
        className={`relative z-10 overflow-hidden rounded-md bg-zinc-900 shadow-lg transition duration-300 md:group-hover:-translate-y-10 md:group-hover:scale-[1.08] md:group-hover:shadow-2xl ${
          isTop10 ? 'ml-12 pt-4' : ''
        }`}
      >
        <div className="relative aspect-video">
          <img src={title.poster} alt={title.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-bold text-white">{title.title}</h3>
            {title.accent && (
              <span className="mt-2 inline-flex rounded bg-red-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {title.accent}
              </span>
            )}
          </div>
        </div>

        <div className="hidden border-t border-white/10 bg-[#181818] p-4 text-white md:block md:opacity-0 md:transition md:duration-300 md:group-hover:opacity-100">
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"
            >
              <PlayIcon filled className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onToggleList(title.id)
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white"
            >
              {isInList ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onOpen(title)
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white"
            >
              <InfoIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
            <span className="rounded border border-white/25 px-1.5 py-0.5">{title.rating}</span>
            <span>{title.seasons ? `${title.seasons} Seasons` : title.duration}</span>
            <span className="text-emerald-400">{title.type === 'show' ? 'Series' : 'Movie'}</span>
          </div>

          <p className="text-sm text-zinc-200" style={clampStyle(2)}>
            {title.description}
          </p>
          <p className="mt-3 text-xs text-zinc-400" style={clampStyle(1)}>
            {title.tags.join(' • ')}
          </p>
        </div>
      </div>
    </article>
  )
}
