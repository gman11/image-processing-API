import express from 'express';
import ic from '../../util/inputChecker';
import ri from '../../util/resizeImage';
const resize = express.Router();
resize.get('/', ic, ri, (req, res) => {
  const image: string = req.query.image as string;
  return res.sendFile(image);
});
export default resize;
