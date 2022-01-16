import sharp from 'sharp';

const sharpResize = async (
  input: string,
  output: string,
  width: number,
  height: number
): Promise<boolean> => {
  try {
    await sharp(input).resize(width, height).toFile(output);
  } catch (error) {
    return false;
  }

  return true;
};
export default sharpResize;
