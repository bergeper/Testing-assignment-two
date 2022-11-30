import { IMovie } from "../../models/IMovie";

export let mockMovies: IMovie[] = [
  {
    Title: "Die Hard Max",
    Poster: "MTPoster",
    Type: "movie",
    imdbID: "123421421",
    Year: "2000",
  },
  {
    Title: "Die Hard Adam",
    Poster: "APPoster",
    Type: "movie",
    imdbID: "3213123",
    Year: "2006",
  },
  {
    Title: "Die Hard Per",
    Poster: "DHPoster",
    Type: "movie",
    imdbID: "32132122",
    Year: "1999",
  },
  {
    Title: "Die Hard Max",
    Poster: "HarryPoster",
    Type: "movie",
    imdbID: "432432",
    Year: "2002",
  },
];

export const getData = async (): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve(mockMovies);
  });
};
