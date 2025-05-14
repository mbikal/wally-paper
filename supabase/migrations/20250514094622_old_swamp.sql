/*
  # Initial schema for monochrome wallpapers

  1. New Tables
    - `wallpapers`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `thumbnail_url` (text)
      - `resolution` (text)
      - `file_size` (text)
      - `downloads` (integer)
      - `category` (text)
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `wallpapers` table
    - Add policy for public read access
    - Add policy for admin-only write access
*/

-- Create wallpapers table
CREATE TABLE IF NOT EXISTS wallpapers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  thumbnail_url text NOT NULL,
  resolution text NOT NULL,
  file_size text NOT NULL,
  downloads integer DEFAULT 0,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON wallpapers
  FOR SELECT
  TO public
  USING (true);

-- Create policy for admin-only write access
CREATE POLICY "Allow admin write access"
  ON wallpapers
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_wallpapers_updated_at
  BEFORE UPDATE ON wallpapers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();