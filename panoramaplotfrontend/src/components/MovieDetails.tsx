import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Box, Text, Image, IconButton, Spinner, Center, useToast, Button } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Movie } from "../types";
import Genre from "../types/Genre";
import { useAuth } from "../components/AuthContext";
import '../styles/MovieDetails.css'; // Import the CSS file

interface MovieDetailsProps {
  favorites: Set<string>;
  setFavorites: React.Dispatch<React.SetStateAction<Set<string>>>;
  MovieId: number;
  GenreIds: number[];
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ favorites, setFavorites, MovieId ,GenreIds}) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5074/movie/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();

        // Map the API response to the Movie type
        const mappedMovie: Movie = {
          Id: data.id,
          OriginalTitle: data.original_title,
          PosterPath: data.poster_path,
          GenreIds: data.genres.map((genre: any) => Genre[genre.id] || genre.name).join(", "),
          ReleaseDate: data.release_date,
          Overview: data.overview,
          // Assuming you have a type field
        };

        console.log("Fetched movie data:", mappedMovie);
        setMovie(mappedMovie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const toggleFavorite = (id: string) => {
    if (!isLoggedIn) {
      toast({
        title: "You need to be logged in to add favorites.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
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
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!movie) {
    return (
      <Center height="100vh">
        <Text>Movie not found</Text>
      </Center>
    );
  }

  console.log("Movie details:", movie);

  return (
    <Box className="movie-details-container">
       <Button onClick={() => navigate('/')} colorScheme="blue" mb={4}>
        Back to Watchlist
      </Button>
      <Box className="movie-image-container">
        <Image
          className="movie-image"
          src={`https://image.tmdb.org/t/p/w500${movie.PosterPath || ''}`}
          alt={movie.OriginalTitle || "N/A"}
          fallbackSrc="/path/to/default/poster.jpg"
          onError={(e) => (e.currentTarget.src = "/path/to/default/poster.jpg")}
        />
      </Box>
      <Box className="movie-info">
        <Text className="movie-title">
          {movie.OriginalTitle || "N/A"}
        </Text>
        <Text className="movie-text">{movie.ReleaseDate || "N/A"}</Text>
        <Text className="movie-genre">Genre: {movie.GenreIds || "N/A"}</Text>
        <Box className="movie-favorite-button">
          <IconButton
            aria-label={
              favorites.has(movie.Id) ? "Remove from favorites" : "Add to favorites"
            }
            icon={favorites.has(movie.Id) ? <FaHeart /> : <FaRegHeart />}
            onClick={() => toggleFavorite(movie.Id)}
            variant="ghost"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            color="white"
            borderRadius="full"
            colorScheme={favorites.has(movie.Id) ? "red" : "gray"}
            size="lg"
          />
        </Box>
      </Box>
      <Box mt={4}>
        <Text className="movie-text">{movie.Overview || "No overview available"}</Text>
      </Box>
    </Box>
  );
};

export default MovieDetails;
