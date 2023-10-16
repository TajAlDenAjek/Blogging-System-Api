// including and importing all methods we need
require('dotenv').config();
require('express-async-errors');
const path=require('path');
const express=require('express');
const app=express();
const PORT=process.env.PORT||3500;
const connectDataBase=require(path.join(__dirname,'db','connect.js'));
const authRouter=require(path.join(__dirname,'routes','auth.js'));
const userRouter=require(path.join(__dirname,'routes','users.js'));
const postRouter=require(path.join(__dirname,'routes','posts.js'));
const categoryRouter=require(path.join(__dirname,'routes','categories.js'));
const multer=require('multer');
const cors=require('cors');
app.use(cors());
const errorHandlerMiddleware=require(path.join(__dirname,'middlewares','error-handler.js'));

//built in middlewares
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'/images')));


//(Routers to the api)
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);
app.use('/api/category',categoryRouter);

app.use(errorHandlerMiddleware);

//uploading image and store it 
const storage=multer.diskStorage
({
    destination:(req,file,cb)=>
    {
        cb(null,'images');
    },
    filename:(req,file,cb)=>
    {
        cb(null,req.body.name);
    }
});
const upload=multer({storage:storage});
// post the image  router
app.post("/api/upload",upload.single("file"),(req,res)=>
{
    res.status(200).json({msg:"file uploaded successfuly"});
});


// starting our server and connecting to the data base
const start=async()=>
{
    try {
        //connecting to the data base
        await connectDataBase(process.env.DATABASE_URI);
        console.log('connected to datat base');
        //listening to the server 
        app.listen(PORT,()=>console.log(`Server running on port ${PORT} ...`));
    } catch (error) {
        //catching errors
        console.log(error);
    }
}
//invoking start method to get the server run 
start();