import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Heart, X, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Movie {
  id: string;
  title: string;
  director: string;
  release_date: string;
  poster_url: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchMovies = async () => {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at');

      if (error) {
        toast.error('Error fetching movies');
        return;
      }

      setMovies(data || []);
    };

    fetchMovies();
  }, [user, navigate]);

  const handleSwipe = async (liked: boolean) => {
    if (!movies[currentIndex]) return;

    try {
      const { error } = await supabase
        .from('movie_likes')
        .insert({
          user_id: user?.id,
          movie_id: movies[currentIndex].id,
          liked
        });

      if (error) throw error;

      if (liked) {
        toast.success('Added to your likes!');
      }

      if (currentIndex < movies.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        toast.success('No more movies to show!');
        navigate('/matches');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Movie Match</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Sign out
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={currentMovie.poster_url}
            alt={currentMovie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">{currentMovie.title}</h2>
            <p className="text-gray-600">Directed by {currentMovie.director}</p>
            <p className="text-gray-500 text-sm">
              Released: {new Date(currentMovie.release_date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-center gap-4 p-4 bg-gray-50">
            <button
              onClick={() => handleSwipe(false)}
              className="p-4 rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleSwipe(true)}
              className="p-4 rounded-full bg-white shadow-md text-green-500 hover:bg-green-50 transition-colors"
            >
              <Heart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}