import express from 'express';
import fs from 'fs';
import path from 'path';

const inputChecker = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const imageName = req.query.imageName;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const imagePath = path.resolve(
    `./images/fullSize/${imageName}`
  );
  if (fs.existsSync(imagePath) == false) {
    res.status(501).send(`<div>The image name was not found</div>`);
    return;
  }
  if (Number.isNaN(width) || Number.isNaN(height)) {
    res.status(501).send(`<div>The Width and Height must be a number</div>`);
    return;
  } else if (width <= 0 || height <= 0) {
    res
      .status(501)
      .send(`<div>The Width and Height must be a number greather than 0</div>`);
    return;
  } else {
    next();
  }
};

export default inputChecker;
