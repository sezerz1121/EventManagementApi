import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb" }));
app.use(express.static("public"));



// import routes

import eventRouter from "./routes/event.routes.js"
import userRouter from "./routes/user.routes.js"
// routes declaration


app.use("/events",eventRouter)
app.use("/user",userRouter)

export {app} 

