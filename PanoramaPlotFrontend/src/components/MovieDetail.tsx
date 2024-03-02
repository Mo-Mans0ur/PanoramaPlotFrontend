import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre: string;
}

const MovieDetails = () => {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=a5543599`)
      .then(response => response.json())
      .then(data => {
        setMovieDetails(data);
      })
      .catch(error => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

if (!movieDetails) {
    return <div>Loading...</div>;
}

return (
  
        {movies.map((movie) => (
            <Box
                key={movie.imdbID}
                width="200px"
                boxShadow="md"
                borderRadius="lg"
                overflow="hidden"
                padding="10px"
            >
                <Box />
                <Image src={movie.Poster} alt={movie.Title} fit="cover" />
                <Text color={colorSwitch} whiteSpace="pre-line">
                {movie.Title}
                </Text>
            </Box>
            ))}        
   
);


export default MovieDetails;
