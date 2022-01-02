import express from "express";
import resize from "./api/resize";

const routes = express.Router();

routes.get("/",(req,res) =>{
    res.send("main api");

});

routes.use("/resize",resize);


export default routes;