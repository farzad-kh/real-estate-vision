
import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    if (mongoose.connections[0].readyState) {
        // console.log("DB alredy connected");
        return
    }

    await mongoose.connect(process.env.MONGODB_URI,{
        dbName: "Real-state-next",
    })

    // console.log("Connect to DB");
}

export default connectDB