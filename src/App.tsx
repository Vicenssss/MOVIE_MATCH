import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { MovieCard } from './components/MovieCard';
import { MatchProfile } from './components/MatchProfile';
import { movies } from './data/movies';
import { profiles } from './data/profiles';
import { Movie } from './types';
import { Film } from 'lucide-react';

function App() {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [likedGenres, setLikedGenres] = useState<string[]>([]);
  const [showMatches, setShowMatches] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const movie = movies[currentMovieIndex];
      setLikedGenres((prev) => [...prev, ...movie.genre]);
    }

    if (currentMovieIndex < movies.length - 1) {
      setCurrentMovieIndex(prev => prev + 1);
    } else {
      setShowMatches(true);
    }
  };

  const getMatchingProfiles = () => {
    return profiles.filter(profile =>
      profile.moviePreferences.some(genre => likedGenres.includes(genre))
    );
  };

  if (showMatches) {
    const matches = getMatchingProfiles();
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            ¡Tus matches basados en gustos de películas!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map(profile => (
              <MatchProfile key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center p-8">
      <div className="flex items-center gap-3 mb-8">
        <Film className="w-8 h-8 text-white" />
        <h1 className="text-3xl font-bold text-white">MovieMatch</h1>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-white text-lg mb-8">
          Desliza derecha si te gusta, izquierda si no
        </p>
        
        {currentMovieIndex < movies.length && (
          <MovieCard
            movie={movies[currentMovieIndex]}
            onSwipe={handleSwipe}
          />
        )}
      </div>
    </div>
  );
}

export default App;