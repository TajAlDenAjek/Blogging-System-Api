const mongoose=require('mongoose');


//getting url for the data base and connect to it with the module mongoose
const connectDB=(url)=>
{
    return mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
};


module.exports=connectDB;