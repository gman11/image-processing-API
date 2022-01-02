import path from 'path';
import sharp  from 'sharp';
import fs from 'fs';

const resizeImage =  async (imageName: string | any, width :string | any, heigth: string | any):Promise<string> =>
{
        try{
            
            let splitName = (imageName as string).split('.');
            let outputImageName = `${splitName[0]}_${width}_${heigth}.${splitName[1]}`;  
            let input = path.normalize(`../image-processing-api/images/fullSize/${imageName}`);
            let output = path.normalize(`../image-processing-api/images/thumb/${outputImageName}`);
            fs.access
            if(fs.existsSync(output) == true){
                //imaged already resized
                return path.resolve(output);
            }
            else{
                //resize image
                const newImage = await sharp(input);
                const resizedImaged =  newImage.resize(parseInt(width),parseInt(heigth));
                const savedImaged =  resizedImaged.toFile(output);
                return  savedImaged.then( () => {
                    return path.resolve(output)
                });
            }          
           }
           catch(err:any){
               console.log(err);
               return `<div>Error Getting Image</div>`;
           }
};

export default { resizeImage};