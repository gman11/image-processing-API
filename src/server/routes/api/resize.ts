import express from 'express';
import sp from '../../util/resizeImage';
const resize = express.Router();
resize.get("/", (req,res)=>{
    let imageName = req.query.imageName;
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    console.log(width);
    console.log(height);
    if(Number.isNaN(width) || Number.isNaN(height) ){

        res.send(`<div>The Width and Height must be a number</div>`);
    }
    else if(width <=0 || height <= 0){

        res.send(`<div>The Width and Height must be a number greather than 0</div>`);
    }
    else{

        let answer = sp.resizeImage(imageName, width, height);
        answer.then((x) =>{
            console.log(x);
            res.sendFile(x)
    
        });
    }
 
});
export default resize;