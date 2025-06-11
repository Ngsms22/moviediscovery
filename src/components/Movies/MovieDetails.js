import { useLocation, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;

  if (!movie) {
    return (
      <div className="movie-details">
        <h2>No movie data found.</h2>
        <button onClick={() => navigate(-1)} className="btn">
          Go Back
        </button>

        <style>{`
          .movie-details {
            padding: 30px;
            max-width: 85%;
            margin: 40px auto;
            background-color: #fefefe;
            color: #333;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            text-align: center;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
          .btn {
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #4a90e2;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #357ABD;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <h2>
        {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"})
      </h2>
      <div className="movie-details-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <p>
            <strong>Overview:</strong> {movie.overview || "N/A"}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            <span className="rating">
              ★ {movie.vote_average.toFixed(1)}
            </span>
          </p>
          <p>
            <strong>Vote Count:</strong> {movie.vote_count}
          </p>
          <p>
            <strong>Popularity:</strong> {movie.popularity}
          </p>
          <p>
            <strong>Original Language:</strong> {movie.original_language}
          </p>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="btn">
        Go Back
      </button>

      <style>{`
        .movie-details {
          padding: 30px;
          max-width: 85%;
          margin: 40px auto;
          background-color: #fefefe;
          color: #333;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .movie-details-content {
          display: flex;
          gap: 30px;
          margin-top: 25px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .movie-poster {
          width: 320px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .movie-info {
          flex: 1;
          min-width: 280px;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #444;
        }
        .movie-info p {
          margin-bottom: 16px;
        }
        strong {
          color: #2c3e50;
          font-weight: 700;
        }
        .rating {
          color: #f39c12;
          font-weight: 700;
          font-size: 1.2rem;
        }
        .btn {
          margin-top: 30px;
          padding: 14px 30px;
          background-color: #4a90e2;
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
          display: inline-block;
        }
        .btn:hover {
          background-color: #357ABD;
        }
        @media (max-width: 768px) {
          .movie-details-content {
            flex-direction: column;
            align-items: center;
          }
          .movie-poster {
            width: 100%;
            max-width: 300px;
          }
          .movie-info {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
