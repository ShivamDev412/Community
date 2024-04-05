import sharp from 'sharp';

const getImageDimensions = async (imageBuffer: Buffer) => {
  const metadata = await sharp(imageBuffer).metadata();
  return {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  };
};
export default getImageDimensions