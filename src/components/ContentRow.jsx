import ThumbnailCard from './ThumbnailCard'

export default function ContentRow({
  title,
  items,
  variant = 'standard',
  onOpenTitle,
  onToggleList,
  myListIds,
}) {
  if (!items.length) {
    return null
  }

  return (
    <section className="px-4 py-5 md:px-10">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <div className="hidden h-[2px] w-20 rounded-full bg-zinc-700 md:block" />
      </div>

      <div className="no-scrollbar overflow-x-auto overflow-y-visible pb-10">
        <div className="flex gap-3 pr-4">
          {items.map((item, index) => (
            <ThumbnailCard
              key={item.id}
              title={item}
              index={index}
              variant={variant}
              onOpen={onOpenTitle}
              onToggleList={onToggleList}
              isInList={myListIds.includes(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
