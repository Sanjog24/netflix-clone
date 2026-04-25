import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { fetchCatalog } from './api/freeApis'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shows from './pages/Shows'
import Movies from './pages/Movies'
import MyList from './pages/MyList'

function App() {
  const [shows, setShows] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true)
        setError('')

        // We load the API data once when the app starts,
        // then pass it down to the pages as props.
        const data = await fetchCatalog()
        setShows(data.shows)
        setMovies(data.movies)
      } catch {
        setError('Could not load free API data right now. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const allTitles = [...shows, ...movies]

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home shows={shows} movies={movies} loading={loading} error={error} />}
        />
        <Route
          path="/shows"
          element={<Shows shows={shows} loading={loading} error={error} />}
        />
        <Route
          path="/movies"
          element={<Movies movies={movies} loading={loading} error={error} />}
        />
        <Route
          path="/mylist"
          element={<MyList allTitles={allTitles} loading={loading} error={error} />}
        />
      </Routes>
    </div>
  )
}

export default App
