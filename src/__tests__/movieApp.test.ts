/**
 *@jest-environment jsdom
 */

import * as servicesFN from "./../ts/services/movieService";
import * as mainFN from "../ts/movieApp";
import { IMovie } from "../ts/models/IMovie";

jest.mock("./../ts/services/movieService.ts");

describe("init", () => {
  test("Should submit html", () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>`;
    let spy = jest.spyOn(mainFN, "handleSubmit").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve();
        })
    );
    mainFN.init();

    //Act
    document.getElementById("search")?.click();

    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

/*
describe("handleSubmit", () => {
  test("should get input", async () => {

    //Arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;

    let movies: IMovie[] = [];

    let searchText: string = "Sebbe";
    movies = await servicesFN.getData(searchText);
    console.log(movies);

    //Act
    mainFN.handleSubmit();

    //Assert
    expect(movies.length).toBeGreaterThan(0);
  });
  
});
*/

describe("createHTML", () => {
  test("Should create HTML for list", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let searchText: string = "Lotr";
    let movies = await servicesFN.getData(searchText);

    //Act
    await mainFN.createHtml(movies, container);

    //Assert
    expect(document.querySelectorAll("div.movie").length).toBe(5);
    console.log(movies);
  });
});
