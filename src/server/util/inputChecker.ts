import express from 'express';
import fs from 'fs';
import path from 'path';

const inputChecker = (req: express.Request, res : express.Response,next:Function): void =>{

    let imageName = req.query.imageName;
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    
    let imagePath = path.normalize(`../image-processing-api/images/fullSize/${imageName}`);
    if(fs.existsSync(imagePath) == false){
        res.send(`<div>The image name was not found</div>`);
        return;
    }
    if(Number.isNaN(width) || Number.isNaN(height) ){

        res.send(`<div>The Width and Height must be a number</div>`);
        return;
    }
    else if(width <=0 || height <= 0){

        res.send(`<div>The Width and Height must be a number greather than 0</div>`);
        return;
    }
    else{

        next();
    }
 
}

export default inputChecker;