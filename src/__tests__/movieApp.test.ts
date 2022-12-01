/**
 *@jest-environment jsdom
 */

import * as servicesFN from "./../ts/services/movieService";
import * as mainFN from "../ts/movieApp";
import { IMovie } from "../ts/models/IMovie";

jest.mock("./../ts/services/movieService.ts");

describe("init", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

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

describe("createHTML", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should create HTML for list", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let searchText: string = "SebbeKingen";
    let movies: IMovie[] = await servicesFN.getData(searchText);

    //Act
    mainFN.createHtml(movies, container);

    //Assert
    //Looking for divs with className movie otherwise container will be shown in the awnser aswell.
    expect(document.querySelectorAll("div.movie").length).toBe(4);
    expect(document.querySelectorAll("h3").length).toBe(4);
    expect(document.querySelectorAll("img").length).toBe(4);
    document.body.innerHTML = "";
  });
});
describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should call createHTML", async () => {
    //Arrange
    let spy = jest.spyOn(mainFN, "createHtml").mockReturnValue();

    document.body.innerHTML = `
    <form id="searchForm">
      <input type="text" id="searchText" value="prupp" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

    //Act
    await mainFN.handleSubmit();

    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });

  test("Should call displayNoResult in catch", async () => {
    //Arrange
    document.body.innerHTML = `
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;
    let spy = jest.spyOn(mainFN, "displayNoResult").mockReturnValue();

    //Act
    await mainFN.handleSubmit();

    //Assert
    expect(spy).toHaveBeenCalled();
  });

  test("Should call for displayNoResult in else", async () => {
    //Arrange
    document.body.innerHTML = `
    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;

    let spy = jest.spyOn(mainFN, "displayNoResult").mockReturnValue();
    let searchText: string = "coolers";
    let movies: IMovie[] = await servicesFN.getData(searchText);

    //Act
    await mainFN.handleSubmit();

    //Assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("displayNoResult", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should show text no results shown", () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    //Act
    mainFN.displayNoResult(container);

    //Assert
    expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
  });
});
