import React from 'react';
import { Movie } from '../types';
import { Heart, X } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSwipe: (direction: 'left' | 'right') => void;
  style?: React.CSSProperties;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSwipe, style }) => {
  return (
    <div
      className="relative w-72 h-96 bg-white rounded-xl shadow-xl"
      style={style}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white rounded-b-xl">
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <p className="text-sm">{movie.year}</p>
        <div className="flex gap-2 mt-2">
          {movie.genre.map((g) => (
            <span key={g} className="px-2 py-1 bg-white/20 rounded-full text-xs">
              {g}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute top-4 left-4">
        <button
          onClick={() => onSwipe('left')}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition-colors"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => onSwipe('right')}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-green-100 transition-colors"
        >
          <Heart className="w-6 h-6 text-green-500" />
        </button>
      </div>
    </div>
  );
};