import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://iaravictoria1:123ABCDE!@proyecto-iara-aquiere.6vnsm1y.mongodb.net/proyecctofinal")
        console.log("MongoDB connected");
    } catch (error) {
        console.log('${error}');
    }
}