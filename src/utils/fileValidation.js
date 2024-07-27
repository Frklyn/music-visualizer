import sharp from 'sharp';

// Validate the uploaded cover image
export async function validateImage(file) {
  const buffer = await file.arrayBuffer();
  const image = sharp(Buffer.from(buffer));
  const metadata = await image.metadata();

  if (metadata.width !== metadata.height) {
    throw new Error('Image must be square');
  }
  if (metadata.width < 1400 || metadata.width > 4000) {
    throw new Error('Image width must be between 1400px and 4000px');
  }
}