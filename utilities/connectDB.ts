import mongoose from "mongoose";

async function connectDB() {
    const mongooseURI = "mongodb://localhost:27017/solutionsphere";

    // If already connected, no need to reconnect
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    // Set up connection event handlers
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
    });

    try {
        // Connect with options to avoid timeout
        await mongoose.connect(mongooseURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process if unable to connect
    }
}

export default connectDB;
