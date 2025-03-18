import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800",
    year: 2010,
    genre: ["Sci-Fi", "Action"]
  },
  {
    id: 2,
    title: "The Grand Budapest Hotel",
    posterUrl: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800",
    year: 2014,
    genre: ["Comedy", "Drama"]
  },
  {
    id: 3,
    title: "Parasite",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800",
    year: 2019,
    genre: ["Drama", "Thriller"]
  },
  {
    id: 4,
    title: "La La Land",
    posterUrl: "https://images.unsplash.com/photo-1547433459-e60d4cae422a?auto=format&fit=crop&w=800",
    year: 2016,
    genre: ["Romance", "Musical"]
  }
];