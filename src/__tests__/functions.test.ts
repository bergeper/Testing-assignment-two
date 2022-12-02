import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/IMovie";
import { mockMovies } from "../ts/services/__mocks__/movieService";

describe("movieSort in functions.ts", () => {
  let movies: IMovie[] = mockMovies;

  test("If boolean is true", () => {
    //Act
    movieSort(movies);

    //Assert
    expect(movies[0].Title).toEqual("Die Hard Adam");
  });

  test("If boolean is false", () => {
    //Act
    movieSort(movies, false);

    //Assert
    expect(movies[0].Title).toEqual("Die Hard Per");
  });

  test("Should not be able to sort after the first sort because two Titles are matching", () => {
    let movies: IMovie[] = [
      {
        Title: "Die Hard Bax",
        Poster: "HarryPoster",
        Type: "movie",
        imdbID: "432432",
        Year: "2002",
      },
      {
        Title: "Die Hard Bax",
        Poster: "HarryPoster",
        Type: "movie",
        imdbID: "432432",
        Year: "2002",
      },
      {
        Title: "Die Hard Aax",
        Poster: "HarryPoster",
        Type: "movie",
        imdbID: "432432",
        Year: "2002",
      },
    ];

    //Act
    movieSort(movies, false);

    //Assert
    expect(movies[0].Title).toEqual("Die Hard Bax");
  });
});
