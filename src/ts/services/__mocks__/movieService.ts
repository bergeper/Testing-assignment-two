import { IMovie } from "../../models/IMovie";

let mockMovies: IMovie[] = [
  {
    Title: "Max-Tacos",
    Poster: "MTPoster",
    Type: "movie",
    imdbID: "123421421",
    Year: "2000",
  },
  {
    Title: "Adams-Päron",
    Poster: "APPoster",
    Type: "movie",
    imdbID: "3213123",
    Year: "2006",
  },
  {
    Title: "Die-Hard-Per",
    Poster: "DHPoster",
    Type: "movie",
    imdbID: "32132122",
    Year: "1999",
  },
  {
    Title: "Harry",
    Poster: "HarryPoster",
    Type: "movie",
    imdbID: "432432",
    Year: "2002",
  },
  {
    Title: "Peter-Panncake",
    Poster: "PanncakePoster",
    Type: "Movie",
    imdbID: "123057324",
    Year: "1910",
  },
];

export const getData = async (): Promise<IMovie[]> => {
  return new Promise((resolve) => {
    resolve(mockMovies);
  });
};
