/*
  # Fix RLS policies for users table

  1. Changes
    - Add INSERT policy for authenticated users to create their own profile
    - Update existing policies to be more specific about data access

  2. Security
    - Users can only create their own profile (id must match auth.uid())
    - Users can read their own data
    - Users can read other users' data (for matching)
    - Users can update their own data
*/

-- Drop existing policies to recreate them with proper permissions
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can read other users data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Allow users to create their own profile
CREATE POLICY "Users can create own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

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