import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test_local", { serverSelectionTimeoutMS: 2000 });
    console.log("Local MongoDB is available!");
    await mongoose.connection.close();
    process.exit(0);
} catch (error) {
    console.log("Local MongoDB is NOT available.");
    process.exit(1);
}
