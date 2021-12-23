import express from "express";
import stuff from "./api/stuff";

const routes = express.Router();

routes.get("/",(req,res) =>{
    res.send("main api");

});

routes.use("/stuff",stuff);


export default routes;