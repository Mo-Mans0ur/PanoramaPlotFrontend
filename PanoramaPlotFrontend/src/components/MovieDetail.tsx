import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetails {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre: string;
    // Add other relevant fields from the API response
  }
  

const MovieDetails = () => {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=a5543599`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response has the correct structure
        setMovieDetails(data as MovieDetails); // Cast the response to MovieDetails
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);
  

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movieDetails.Title}</h1>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
        <p>Year: {movieDetails.Year}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Type: {movieDetails.Type}</p>

    </div>
  );
};

export default MovieDetails;
