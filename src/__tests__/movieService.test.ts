import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieService";

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

jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({ data: { Search: mockMovies } });
    });
  },
}));

describe("getData in movieservice.ts", () => {
  test("Should get response from AxiosResponse", async () => {
    //arrange
    let searchText: string = "Lord";

    //act
    let movies: IMovie[] = await getData(searchText);

    //assert
    expect(movies.length).toBe(5);
    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0].Title).toBe("Max-Tacos");
    expect(movies[1].Title).toBe("Adams-Päron");
  });
  //test("Should not get response from AxiosResponse", () => {});
});
