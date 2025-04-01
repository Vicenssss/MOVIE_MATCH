/*
  # Create users table and authentication setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches the auth.users id
      - `email` (text, unique)
      - `name` (text)
      - `lastname` (text)
      - `bio` (text)
      - `genres` (text) - comma-separated list of movie genres
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can read other users' data (for matching)
      - Users can update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  lastname text NOT NULL,
  bio text,
  genres text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to read other users' data for matching
CREATE POLICY "Users can read other users data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() != id);

-- Allow users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);