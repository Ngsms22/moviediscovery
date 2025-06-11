const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="filter">
      <label>Genre:</label>
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genreId) => (
          <option key={genreId} value={genreId}>
            {genreId}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GenreFilter
