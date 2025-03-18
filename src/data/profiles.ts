import { Profile } from '../types';

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Alex",
    age: 28,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800",
    bio: "Film enthusiast and coffee addict",
    moviePreferences: ["Sci-Fi", "Action"]
  },
  {
    id: 2,
    name: "Sam",
    age: 25,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800",
    bio: "Looking for someone to watch movies with",
    moviePreferences: ["Drama", "Romance"]
  },
  {
    id: 3,
    name: "Jordan",
    age: 30,
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800",
    bio: "Indie film lover and book worm",
    moviePreferences: ["Drama", "Thriller"]
  }
];