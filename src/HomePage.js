"use client"

import { useState, useEffect } from "react"
import { movieService } from "./Services/movieService"
import "./App.css"

import GenreFilter from "./components/Filters/GenreFilter"
import SortOption from "./components/Filters/SortOptions"
import MovieList from "./components/Movies/MovieList"
import SearchBar from "./components/Movies/SearchBar"

function HomePage() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [yearRange, setYearRange] = useState({ min: 1900, max: 2030 })
  const [selectedYear, setSelectedYear] = useState("")
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 })
  const [selectedRating, setSelectedRating] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage] = useState(8)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await movieService.getPopularMovies()

        setMovies(data.results)
        setFilteredMovies(data.results)

        const allGenreIds = data.results.flatMap((movie) => movie.genre_ids)
        const uniqueGenreIds = [...new Set(allGenreIds)]
        setGenres(uniqueGenreIds)

        const years = data.results
          .map((movie) => new Date(movie.release_date).getFullYear())
          .filter((year) => !isNaN(year))

        if (years.length > 0) {
          setYearRange({
            min: Math.min(...years),
            max: Math.max(...years),
          })
        }

        const ratings = data.results.map((movie) => movie.vote_average)
        if (ratings.length > 0) {
          setRatingRange({
            min: Math.floor(Math.min(...ratings)),
            max: Math.ceil(Math.max(...ratings)),
          })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    let result = [...movies]

    if (selectedGenre) {
      result = result.filter((movie) =>
        movie.genre_ids.includes(Number.parseInt(selectedGenre))
      )
    }

    if (selectedYear) {
      result = result.filter((movie) => {
        const movieYear = new Date(movie.release_date).getFullYear()
        return movieYear === Number.parseInt(selectedYear)
      })
    }

    if (selectedRating) {
      const rating = Number.parseInt(selectedRating)
      result = result.filter(
        (movie) => Math.floor(movie.vote_average) === rating
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          (movie.overview && movie.overview.toLowerCase().includes(query))
      )
    }

    setFilteredMovies(result)
    setCurrentPage(1)
  }, [movies, selectedGenre, selectedYear, selectedRating, searchQuery])

  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const resetFilters = () => {
    setSelectedGenre("")
    setSelectedYear("")
    setSelectedRating("")
    setSearchQuery("")
  }

  const generateYearOptions = () => {
    const years = []
    for (let year = yearRange.max; year >= yearRange.min; year--) {
      years.push(year)
    }
    return years
  }

  const generateRatingOptions = () => {
    const ratings = []
    for (let rating = ratingRange.max; rating >= ratingRange.min; rating--) {
      ratings.push(rating)
    }
    return ratings
  }

  if (loading) {
    return (
      <div className="app-status">
        <h1>Loading movies...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-status error">
        <h1>Error: {error}</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <header>
        <h1>Popular Movies</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <div className="filters-container">
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
        <SortOption
          label="Year"
          value={selectedYear}
          options={generateYearOptions()}
          onChange={setSelectedYear}
        />
        <SortOption
          label="Rating"
          value={selectedRating}
          options={generateRatingOptions()}
          onChange={setSelectedRating}
        />
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <MovieList
        movies={currentMovies}
        filteredMovies={filteredMovies}
        moviesPerPage={moviesPerPage}
        currentPage={currentPage}
        paginate={paginate}
        indexOfFirstMovie={indexOfFirstMovie}
        indexOfLastMovie={indexOfLastMovie}
      />
    </div>
  )
}

export default HomePage
