import express from 'express';
import path from 'path';
import sharp  from 'sharp';
import fs from 'fs';

const resizeImage =  async (req: express.Request, res: express.Response, next: Function): Promise<void> =>
{
        try{
            let imageName = req.query.imageName;
            let width = Number(req.query.width);
            let height = Number(req.query.height);

            let splitName = (imageName as string).split('.');
            let outputImageName = `${splitName[0]}_${width}_${height}.${splitName[1]}`;  
            let input = path.normalize(`../image-processing-api/images/fullSize/${imageName}`);
            let output = path.normalize(`../image-processing-api/images/thumb/${outputImageName}`);
            fs.access
            if(fs.existsSync(output) == true){
                //imaged already resized
                req.query.image = path.resolve(output);
                next();
            }
            else{
                //resize image
                const newImage = await sharp(input);
                const resizedImaged =  newImage.resize(width,height);
                const savedImaged =  resizedImaged.toFile(output);
                 savedImaged.then( () => {
                    req.query.image = path.resolve(output);
                    next();

                });
            }          
           }
           catch(err:any){
               console.log(err);
               res.send( `<div>Error Getting Image</div>`);
               return;
           }
};

export default  resizeImage;