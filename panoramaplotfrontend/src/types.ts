export interface MovieQuery {
    searchText: string;
  }


  // src/types.ts
export interface Movie {
  OriginalTitle: string;
  Id: string;
  PosterPath: string;
  GenreIds: number[];
  ReleaseDate: string;
  Overview: string;
}
