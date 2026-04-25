const OMDB_BASE_URL = 'https://www.omdbapi.com/'

// For a first-year project, this is easier to understand:
// we keep a short array of titles and fetch each one directly.
const SHOW_TITLES = [
  'Stranger Things',
  'Breaking Bad',
  'Friends',
  'The Big Bang Theory',
  'Brooklyn Nine-Nine',
  'Naruto',
  'Jujutsu Kaisen',
  'One Punch Man',
]

const MOVIE_TITLES = [
  'Inception',
  'Interstellar',
  'The Dark Knight',
  'Fight Club',
  'Shutter Island',
  '3 Idiots',
  'Chennai Express',
  'Dangal',
]

// The user shared this key in chat.
// If you later add VITE_OMDB_API_KEY in .env, that value will be used instead.
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'bad50fb1'

function splitGenres(genreText = '') {
  if (!genreText || genreText === 'N/A') {
    return ['General']
  }

  return genreText.split(',').map((item) => item.trim())
}

function splitCast(actorText = '') {
  if (!actorText || actorText === 'N/A') {
    return ['Cast not available']
  }

  return actorText.split(',').map((item) => item.trim()).slice(0, 4)
}

function buildFallbackImage(title) {
  return `https://placehold.co/1200x675/111111/e5e5e5?text=${encodeURIComponent(title)}`
}

function mapOmdbItem(item, type, index) {
  const genres = splitGenres(item.Genre)
  const poster = item.Poster && item.Poster !== 'N/A' ? item.Poster : buildFallbackImage(item.Title)

  return {
    id: `${type}-${item.imdbID}`,
    title: item.Title,
    type,
    year: item.Year || 'N/A',
    rating: item.Rated && item.Rated !== 'N/A' ? item.Rated : type === 'show' ? 'TV Show' : 'Movie',
    seasons: type === 'show' && item.totalSeasons ? Number(item.totalSeasons) : undefined,
    duration: item.Runtime && item.Runtime !== 'N/A' ? item.Runtime : type === 'show' ? '45 min' : '120 min',
    genres,
    tags: genres.slice(0, 3),
    accent: index < 3 ? 'Top Pick' : 'Watch Now',
    progress: index % 2 === 0 ? 0 : 25 + index * 5,
    top10Rank: index + 1,
    description: item.Plot && item.Plot !== 'N/A' ? item.Plot : 'Plot not available right now.',
    cast: splitCast(item.Actors),
    banner: poster,
    poster,
    logo: item.Title,
    episodes: [],
  }
}

async function fetchOneTitle(title, type, index) {
  // We use the exact title with "t=" because this is simpler than
  // searching a list of results and then choosing the best match.
  const url = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=${type === 'show' ? 'series' : 'movie'}&plot=full`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not load ${title}`)
  }

  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error || `Could not load ${title}`)
  }

  return mapOmdbItem(data, type, index)
}

export async function fetchShows() {
  const showPromises = SHOW_TITLES.map((title, index) => fetchOneTitle(title, 'show', index))
  return Promise.all(showPromises)
}

export async function fetchMovies() {
  const moviePromises = MOVIE_TITLES.map((title, index) => fetchOneTitle(title, 'movie', index))
  return Promise.all(moviePromises)
}

export async function fetchCatalog() {
  const [shows, movies] = await Promise.all([fetchShows(), fetchMovies()])
  return { shows, movies }
}

export function filterTitles(items, searchText, selectedGenre = 'All') {
  const text = searchText.trim().toLowerCase()
  const genre = selectedGenre.toLowerCase()

  return items.filter((item) => {
    const matchesText =
      text === '' ||
      item.title.toLowerCase().includes(text) ||
      item.genres.some((oneGenre) => oneGenre.toLowerCase().includes(text))

    const matchesGenre =
      genre === 'all' || item.genres.some((oneGenre) => oneGenre.toLowerCase() === genre)

    return matchesText && matchesGenre
  })
}

export function getGenres(items) {
  const genreSet = new Set()

  items.forEach((item) => {
    item.genres.forEach((genre) => {
      genreSet.add(genre)
    })
  })

  return ['All', ...Array.from(genreSet).sort()]
}
