import React from 'react';
import { Profile } from '../types';

interface MatchProfileProps {
  profile: Profile;
}

export const MatchProfile: React.FC<MatchProfileProps> = ({ profile }) => {
  return (
    <div className="w-72 bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={profile.photoUrl}
        alt={profile.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">
          {profile.name}, {profile.age}
        </h3>
        <p className="text-gray-600 mt-2">{profile.bio}</p>
        <div className="mt-3">
          <p className="text-sm font-semibold">Favorite Genres:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.moviePreferences.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};