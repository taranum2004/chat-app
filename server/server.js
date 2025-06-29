import express from 'express';
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app)

// Initialize socket.io server
export const io = new Server(server, {
  cors: {origin: "*"}
})

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if(userId) userSocketMap[userId] = socket.id;


  // Emit online users to all connected clients
io.emit("getOnlineUsers", Object.keys(userSocketMap));

socket.on("disconnect", ()=>{
  console.log("User Disconnected", userId); // userId needs to be accessible in this scope
  delete userSocketMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emits updated online users after disconnect
})
})







// Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());
app.use("/api/messages", messageRouter);

app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);

await connectDB();



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on port: " + PORT));