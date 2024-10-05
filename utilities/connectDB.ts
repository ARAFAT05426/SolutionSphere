import mongoose from "mongoose";



async function connectDB() {

    const mongooseURI = "mongodb://localhost:27017/solutionsphere"

    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    // Set up a connection event handler to log errors
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
    });

    try {
        // Explicitly specify the database name in the options
        await mongoose.connect(mongooseURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

// Ensure to call this function in your main application file
export default connectDB;
