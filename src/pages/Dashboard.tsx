import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Heart, X, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  lastname: string;
  bio: string;
  genres: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [potentialMatches, setPotentialMatches] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserGenres, setCurrentUserGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchCurrentUserGenres = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('genres')
          .eq('id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            toast.error('User profile not found. Please try logging in again.');
            await signOut();
            return;
          }
          throw error;
        }

        if (!data) {
          toast.error('User profile not found. Please try logging in again.');
          await signOut();
          return;
        }

        if (!data.genres) {
          setCurrentUserGenres([]);
          return;
        }

        setCurrentUserGenres(data.genres.split(',').map((g: string) => g.trim()));
      } catch (error: any) {
        console.error('Error fetching user genres:', error);
        toast.error('Error loading user preferences');
        await signOut();
      }
    };

    const fetchPotentialMatches = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, lastname, bio, genres')
          .neq('id', user.id);

        if (error) throw error;

        setPotentialMatches(data || []);
      } catch (error: any) {
        console.error('Error fetching matches:', error);
        toast.error('Error loading potential matches');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUserGenres();
    fetchPotentialMatches();
  }, [user, navigate, signOut]);

  const handleLike = () => {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
      toast.success('Added to matches!');
    }
  };

  const handleDislike = () => {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const calculateMatchPercentage = (userGenres: string) => {
    if (!currentUserGenres.length) return 0;
    
    const theirGenres = userGenres.split(',').map(g => g.trim());
    const commonGenres = theirGenres.filter(genre => 
      currentUserGenres.includes(genre)
    );
    return Math.round((commonGenres.length / currentUserGenres.length) * 100);
  };

  const currentProfile = potentialMatches[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
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

        {currentProfile ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {currentProfile.name} {currentProfile.lastname}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Match: {calculateMatchPercentage(currentProfile.genres)}%
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{currentProfile.bio}</p>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Favorite Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.genres.split(',').map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 p-4 bg-gray-50">
              <button
                onClick={handleDislike}
                className="p-4 rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={handleLike}
                className="p-4 rounded-full bg-white shadow-md text-green-500 hover:bg-green-50 transition-colors"
              >
                <Heart className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No more profiles to show!</p>
          </div>
        )}
      </div>
    </div>
  );
}