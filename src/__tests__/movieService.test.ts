import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieService";

let mockMovies: IMovie[] = [
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

jest.mock("axios", () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      let queryString = searchText;
      let usp = new URLSearchParams(queryString);
      let s = usp.get("s");
      let newSearchText = `${s}`;

      if (newSearchText.length > 3) {
        resolve({ data: { Search: mockMovies } });
      } else {
        reject({ data: [] });
      }
    });
  },
}));

describe("getData in movieservice.ts", () => {
  test("Should get response from AxiosResponse", async () => {
    //arrange

    let searchText: string = "Sebbekingen";
    //act
    let movies: IMovie[] = await getData(searchText);

    //assert
    expect(movies.length).toBe(4);
    expect(movies.length).toBeGreaterThan(0);
    expect(movies[0].Title).toBe("Die Hard Max");
    expect(movies[1].Title).toBe("Die Hard Adam");
  });

  test("Should not get response from AxiosResponse", async () => {
    //arrange
    let searchText: string = "Se";
    let moviesFail: IMovie[] = [];

    //act
    try {
      moviesFail = await getData(searchText);
      //assert
    } catch (movies: any) {
      expect(movies.data.length).toBe(0);
    }
  });
});
