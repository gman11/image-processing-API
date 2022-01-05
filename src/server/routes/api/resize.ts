import express from 'express';
import ic from '../../util/inputChecker'
import ri from '../../util/resizeImage';
const resize = express.Router();
resize.get("/",ic, ri,(req,res) =>{
        let image: string = req.query.image as string;
        res.sendFile(image);
});
export default resize;