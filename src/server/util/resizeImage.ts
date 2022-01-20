import express from 'express';
import path from 'path';
import fs from 'fs';
import sharpResize from '../services/sharpService';

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  try {
    const imageName = req.query.imageName;
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    const splitName = (imageName as string).split('.');
    const outputImageName = `${splitName[0]}_${width}_${height}.${splitName[1]}`;

    const testPath = path.resolve(`./images/fullSize/${imageName}`);
    console.log(testPath);
    const input = path.resolve(`./images/fullSize/${imageName}`);
    const output = path.resolve(`./images/thumb/${outputImageName}`);
    fs.access;
    if (fs.existsSync(output) == true) {
      // imaged already resized
      req.query.image = path.resolve(output);
      next();
    } else {
      const result = await sharpResize(input, output, width, height);

      if (result) {
        req.query.image = output;
        next();
      } else {
        res.send(`<div>Error Getting Image Bool false</div>`);
        return;
      }
    }
  } catch (err: any) {
    console.log(err);
    res.send(`<div>Error Getting Image</div>`);
    return;
  }
};

export default resizeImage;
