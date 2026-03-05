import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const mongoUri = process.env.MONGO_URI;
console.log(`Connecting to: ${mongoUri}`);

try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connection successful!");
    await mongoose.connection.close();
    process.exit(0);
} catch (error) {
    console.error(`Connection failed: ${error.message}`);
    process.exit(1);
}
