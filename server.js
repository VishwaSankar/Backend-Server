import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes.js"
import userRoute from "./routes/user.routes.js"
// import cartRoute from "./routes/cart.routes.js"
// import gamesRoute from './routes/games.routes.js'
import orderroute from './routes/order.routes.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./routes/cart.routes.js";
import favroute from "./routes/fav.routes.js"
import reviewroute from "./routes/review.routes.js"
import sessionMiddleware from "./middleware/session.js";
const app =express();
const connect= async ()=> {try{
    await mongoose
      .connect(
        "mongodb+srv://vishwaexpert7788:12345qwert@cluster001.vzfz843.mongodb.net/Gaminghaven"
      )
      .then((res) => console.log("Database Connected"));
  } catch (err) {
    console.log(err);
  }
}
app.use(sessionMiddleware);
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"https://dainty-semolina-379287.netlify.app", credentials:true}))
app.use("/auth",authRoute)
app.use("/users",userRoute)
// app.use("/games",gamesRoute)
app.use("/fav",favroute)
app.use("/cart",router)
app.use("/library",router)
// app.use("/reviews",reviewroute)
app.use("/order",orderroute)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://dainty-semolina-379287.netlify.app');
  next();
});
app.use((req, res, next) => {
  res.header('Content-Security-Policy', "default-src 'self'; frame-ancestors 'none';");
  next();
});
app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMessage=err.message || "something went wrong"

  return res.status(errorStatus).send(errorMessage);
})

connect();
app.listen(5000,()=>{
    connect()
    console.log("Backend Server is running");
})
