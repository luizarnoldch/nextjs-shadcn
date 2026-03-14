/**
 * Utility functions for extracting cropped images from a canvas using coordinates.
 */

// Create the WebP from crop
export const getCroppedImgWebP = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  targetSize = 400
): Promise<Blob> => {
  const image = new Image();
  image.src = imageSrc;
  image.crossOrigin = 'anonymous'; // En caso de que se necesite CORS para algunas URLs

  // Wait for image to load
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = (error) => reject(new Error('Failed to load image'));
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Force output target size to 400x400 for profile pictures
  canvas.width = targetSize;
  canvas.height = targetSize;

  // Set default background to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Smoothing for better resizing
  ctx.imageSmoothingQuality = 'high';

  // Calculate the scale between the original crop size and the target size
  const scale = targetSize / pixelCrop.width;

  // Draw the image onto the canvas, accounting for the fact that pixelCrop might be outside image boundaries.
  // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // We need to map the image pixels (sx, sy) to canvas pixels (dx, dy).
  // If pixelCrop.x is negative, it means the crop started to the left of the image.
  // In that case, the image starts at dx = -pixelCrop.x * scale in the canvas.
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    -pixelCrop.x * scale,
    -pixelCrop.y * scale,
    image.width * scale,
    image.height * scale
  );

  // Export as WebP
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      },
      'image/webp',
      0.9 // 90% quality
    );
  });
};
