import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="movie-card-link" 
      state={{ movie }}  // pass movie as state here
    >
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p className="movie-year">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
          <div className="movie-rating">
            <span className="star">★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <button className="see-more-button" type="button">
            See More
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
