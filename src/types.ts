export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  genre: string[];
}

export interface Profile {
  id: number;
  name: string;
  age: number;
  photoUrl: string;
  bio: string;
  moviePreferences: string[];
}