import { Genre, Movie } from "./index.types";
import { movies } from "./db.json";

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  // if genres is not an array
  // it returns an empty array
  if (!Array.isArray(genres)) return [];

  // if genres was an empty array
  // it returns an array of a single random movie
  if (!genres.length)
    return [movies[Math.floor(Math.random() * (movies.length + 1))]];

  // finally it returns a sorted array of movies based on genres with maximum length
  const list: Movie[] = [];
  // this  function starts from the length of the imported genres
  // until the loop iterator equals to 1
  const equals = (i: number) => {
    // if the loop iterator is euqal to 1
    // so it will break the loop and returns the expected list
    if (i < 1) return list;
    movies.map((movie) => {
      // checks if the genre of a movie is not equal to the iterator
      // it will continue the loop
      if (movie.genres.length !== i) return;
      // checks if all movie genres are exist in imported genres array
      // iit will push this movie to the final list
      if (checker(genres, movie.genres as any[])) {
        list.push(movie);
      }
    });

    i--;
    equals(i);
  };

  equals(genres.length);
  return list;
};

// checks if all elements of target array is exist in another array
const checker = (arr: Genre[], target: Genre[]) =>
  target.every((v) => arr.includes(v));
