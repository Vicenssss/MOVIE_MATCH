/*
  # Create movies table and likes

  1. New Tables
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `director` (text)
      - `release_date` (date)
      - `poster_url` (text)
      - `created_at` (timestamptz)
    
    - `movie_likes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `movie_id` (uuid, references movies)
      - `liked` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  director text NOT NULL,
  release_date date NOT NULL,
  poster_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS movie_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id uuid REFERENCES movies(id) ON DELETE CASCADE,
  liked boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, movie_id)
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE movie_likes ENABLE ROW LEVEL SECURITY;

-- Movies can be read by authenticated users
CREATE POLICY "Movies are viewable by authenticated users"
  ON movies
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create their likes
CREATE POLICY "Users can create their own likes"
  ON movie_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own likes
CREATE POLICY "Users can read their own likes"
  ON movie_likes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some sample movies
INSERT INTO movies (title, director, release_date, poster_url) VALUES
  ('Inception', 'Christopher Nolan', '2010-07-16', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800'),
  ('The Shawshank Redemption', 'Frank Darabont', '1994-09-23', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800'),
  ('Pulp Fiction', 'Quentin Tarantino', '1994-10-14', 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800'),
  ('The Dark Knight', 'Christopher Nolan', '2008-07-18', 'https://images.unsplash.com/photo-1547433459-e60d4cae422a?auto=format&fit=crop&w=800');