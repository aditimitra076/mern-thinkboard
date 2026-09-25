import mongoose from "mongoose";

export const connectDB = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI);
//mongodb+srv://aditimitra076_db_user:<db_password>@cluster0.kqdmigx.mongodb.net/?appName=Cluster0
        console.log("MONGODB CONNECTED SUCCESSFULLY!");

    }catch(error){
        console.log("Error connecting to MongoDB", error);
        process.exit(1); //1 is exit with failure
    
    }
};