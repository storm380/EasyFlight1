import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import flightRoutes from "./routes/flightRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import cookieParser from "cookie-parser";


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cookieParser())


// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes); // Use auth routes with /api/auth prefix

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the EasyFlight API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// // Import routes
// import flightRoutes from "./routes/flightRoutes.js";
// import hotelRoutes from "./routes/hotelRoutes.js";
// import carRoutes from "./routes/carRoutes.js";
// import destinationRoutes from "./routes/destinationRoutes.js";
// import authRoutes from "./routes/authRoutes.js"; // Import auth routes
// import cookieParser from "cookie-parser";

// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();
// app.use(cookieParser());

// // CORS Configuration
// const corsOptions = {
//   origin: "http://localhost:5173", // Frontend origin
//   credentials: true, // Allow cookies and auth headers
// };

// app.use(cors(corsOptions)); // Apply CORS middleware
// app.use(express.json()); // Parse JSON bodies

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use("/api/flights", flightRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/cars", carRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/auth", authRoutes); // Auth routes with /api/auth prefix

// // Default route
// app.get("/", (req, res) => {
//   res.send("Welcome to the EasyFlight API!");
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });