import React, { useEffect, useState } from "react";
import { Box, Text, Image, useColorMode, Spinner,
  Center,
  Heading,
  IconButton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
 
interface Movie {
  
  OriginalTitle: string;
  year: string;
  Id: string;
  type: string;
  PosterPath: string;
  genre: string;
  ReleaseDate: string;
}

interface MovieDetailsProps {
  nextUrl: string;
  prevUrl: string;
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({favorites, setFavorites}) => {
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5074/movie/${id}`);
        const data = await response.json();

        const mappedData: Movie = {
          OriginalTitle: data.original_title,
          year: data.release_date.split('-')[0], // Assuming year is the first part of release_date
          Id: data.id.toString(),
          type: "Movie", // Assuming type as Movie
          PosterPath: data.poster_path,
          genre: data.genres.map((g: any) => g.name).join(', '), // Joining genre names
          ReleaseDate: data.release_date,
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
    <Box p={4}>
      <Image
    src={`https://image.tmdb.org/t/p/w500${movie.PosterPath}}`}
        alt={movie.OriginalTitle}
        
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" className="movie-title">
          {movie.OriginalTitle}
        </Text>
        <Text>Year: {movie.year}</Text>
        <Text>Genre: {movie.genre}</Text>
        <Text>Type: {movie.type}</Text>
        <Text>Release Date: {movie.ReleaseDate}</Text>
        <IconButton 
          aria-label={
           favorites.has(movie.Id) ? "Remove from favorites" : "Add to favorites"
          } 
          icon={favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />} 
          onClick={() => toggleFavorite(movie.Id)}
          variant="ghost"
          colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
          size="lg"
          position="absolute"
          top="4"
          right="4"
        />
      </Box>
    </Box>
  );
};

export default MovieDetails;
