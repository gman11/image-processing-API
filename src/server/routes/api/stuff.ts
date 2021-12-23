import express from 'express';

const stuff = express.Router();

stuff.get("/", (req,res)=>{
    res.send("stuff api route");

});

export default stuff;