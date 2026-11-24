-- Create the "project-images" storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the bucket
-- 1. Allow public read access to all images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'project-images' );

-- 2. Allow authenticated admin users to upload/insert images
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'project-images' );

-- 3. Allow authenticated admin users to update their uploaded images
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'project-images' );

-- 4. Allow authenticated admin users to delete images
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'project-images' );
