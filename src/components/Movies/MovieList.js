import MovieCard from "./MovieCard"

const MovieList = ({
  movies,
  filteredMovies,
  moviesPerPage,
  currentPage,
  paginate,
  indexOfFirstMovie,
  indexOfLastMovie,
}) => {
  return (
    <>
      <main className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="no-results">No movies found matching your criteria</div>
        )}
      </main>

      {filteredMovies.length > moviesPerPage && (
        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-button">
            &laquo; Prev
          </button>

          {Array.from({ length: Math.ceil(filteredMovies.length / moviesPerPage) }).map((_, index) => {
            const pageNum = index + 1
            const showPageNumber =
              pageNum === 1 ||
              pageNum === Math.ceil(filteredMovies.length / moviesPerPage) ||
              (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

            if (showPageNumber) {
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`page-button ${currentPage === pageNum ? "active" : ""}`}
                >
                  {pageNum}
                </button>
              )
            } else if (
              (pageNum === 2 && currentPage > 3) ||
              (pageNum === Math.ceil(filteredMovies.length / moviesPerPage) - 1 &&
                currentPage < Math.ceil(filteredMovies.length / moviesPerPage) - 2)
            ) {
              return (
                <span key={pageNum} className="ellipsis">
                  ...
                </span>
              )
            }
            return null
          })}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredMovies.length / moviesPerPage)}
            className="page-button"
          >
            Next &raquo;
          </button>
        </div>
      )}

      <div className="results-info">
        Showing {indexOfFirstMovie + 1}-{Math.min(indexOfLastMovie, filteredMovies.length)} of {filteredMovies.length} movies
      </div>
    </>
  )
}

export default MovieList
