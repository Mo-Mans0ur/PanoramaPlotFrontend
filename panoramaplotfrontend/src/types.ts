export interface MovieQuery {
    searchText: string;
  }


  // src/types.ts
export interface Movie {
  OriginalTitle: string;

  Id: string;
  type: string;
  PosterPath: string;
  genre: string;
  ReleaseDate: string;
  Overview: string;
}
