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
    const input = path.resolve(
      `./../image-processing-api/images/fullSize/${imageName}`
    );
    const output = path.resolve(
      `./../image-processing-api/images/thumb/${outputImageName}`
    );
    fs.access;
    if (fs.existsSync(output) == true) {
      // imaged already resized
      req.query.image = path.resolve(output);
      next();
    } else {
      // resize image
      // const newImage = await sharp(input);
      // const resizedImaged = newImage.resize(width, height);
      // const savedImaged = resizedImaged.toFile(output);
      // savedImaged.then( () => {
      //  req.query.image = path.resolve(output);
      //  next();
      // });

      //  sharpResize(input,output,width,height ).then(()=>{
      //      console.log("inside sharpResize");
      //     req.query.image = output;
      //     next();

      //  });

      const test = await sharpResize(input, output, width, height);

      if (test) {
        console.log('inside sharpResize True');
        req.query.image = output;
        next();
      } else {
        console.log('inside sharpResize false');
        res.send(`<div>Error Getting Image Bool false</div>`);
        return;
      }

      console.log('end of resizeImage');
    }
  } catch (err: any) {
    console.log(err);
    res.send(`<div>Error Getting Image</div>`);
    return;
  }
};

export default resizeImage;
