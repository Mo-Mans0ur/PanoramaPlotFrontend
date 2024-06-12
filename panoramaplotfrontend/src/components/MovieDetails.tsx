import React, { useEffect, useState } from "react";
import { Box, Text, Image, Spinner,
  Center,
  Heading,
  IconButton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Movie } from "../types";

interface MovieDetailsProps {
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({nextUrl,prevUrl,favorites, setFavorites}) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5074/movie/${id}`);
        const data = await response.json();

        const mappedData: Movie = {
          OriginalTitle: data.original_title,
         
          Id: data.id.toString(),
          type: "Movie", // Assuming type as Movie
          PosterPath: data.poster_path,
          genre: data.genres.map((g: any) => g.name).join(', '), // Joining genre names
          ReleaseDate: data.release_date,
          Overview: data.overview,
        };

        setMovie(mappedData);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }finally{
        console.log("Movie data:", movie);
        setLoading(false);
      }
    };

    fetchMovieDetails();
    
  }, [id]);

  const toggleFavorite = async (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!movie) {
    return (
      <Box>
        <Heading as="h2" size="lg">
          Movie not found
        </Heading>
      </Box>
    );
  }
  return (
    <Box className="movie-details-container">
      <Box className="movie-image-container">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.PosterPath}`}
          alt={movie.OriginalTitle}
          className="movie-image"
        />
        <IconButton
          aria-label={favorites.has(movie.Id) ? "Remove from favorites" : "Add to favorites"}
          icon={favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />}
          onClick={() => toggleFavorite(movie.Id)}
          variant="ghost"
          colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
          size="lg"
          className="favorite-button"
        />
      </Box>
      <Box className="movie-info">
        <Heading as="h1" className="movie-title">{movie.OriginalTitle}</Heading>
        <Text className="movie-genre">Genre: {movie.genre}</Text>
        <Text className="movie-text">Overview: {movie.Overview}</Text>
        <Text className="movie-text">Type: {movie.type}</Text>
        <Text className="movie-text">Release Date: {movie.ReleaseDate}</Text>
      </Box>
    </Box>
  );
};

export default MovieDetails;