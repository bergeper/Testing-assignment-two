import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/IMovie";

//jest.mock("./../ts/services/movieService");

describe("movieSort in functions.ts", () => {
  test("Should sort by title", () => {
    let movies = [
      {
        Title: "LOTR",
        Type: "Movie",
        Poster: "http;//...",
        Year: "2000",
        imdbID: "...",
      },
    ];

    movieSort(movies, true);

    expect(movies.length).toBe(1);
    expect(movies[0].Title).toBe("LOTR");
  });
  // test("Should sort by title", () => {});
});
