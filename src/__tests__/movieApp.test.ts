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
    document.body.innerHTML = `
    <form id="searchForm">
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
  });
});

describe("createHTML", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should create HTML for list", async () => {
    //Arrange
    expect.assertions(3);

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
  });
});
describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should call createHTML", async () => {
    //Arrange
    expect.assertions(2);
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
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("Should call for displayNoResult in else", async () => {
    //Arrange
    expect.assertions(2);
    document.body.innerHTML = `
    <form id="searchForm">
      <input type="text" id="searchText" value="co" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;

    let spy = jest.spyOn(mainFN, "displayNoResult").mockReturnValue();

    //Act
    await mainFN.handleSubmit();

    //Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test("Should call displayNoResult in catch because value empty", async () => {
    //Arrange
    expect.assertions(2);

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
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("displayNoResult", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("Should show text no results shown", () => {
    //Arrange
    expect.assertions(2);

    document.body.innerHTML = `<div id="movie-container"></div>`;

    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    //Act
    mainFN.displayNoResult(container);

    //Assert
    expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
    expect(document.querySelectorAll("p").length).toBe(1);
  });
});
