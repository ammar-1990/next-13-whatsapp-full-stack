import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routers/authRouter.js";
import messageRoute from "./routers/messageRouter.js";
import { Server } from "socket.io";
import path from 'path';
import multer from 'multer'

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/uploads/images', express.static('uploads/images'));  
app.use('/uploads/recordings', express.static('uploads/recordings'));                
      
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)              
); 


    
          






//socket.io

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });                  
global.onlineUsers = new Map();
io.on('connection',(socket)=>{
global.chatSocket=socket
socket.on("add-user",(userId)=>{
    console.log('new user',userId)
onlineUsers.set(userId,socket.id)
})
socket.on("send-msg",(data)=>{ 
    console.log(data)
 const sendUserSocket = onlineUsers.get(data.to)
 if(sendUserSocket){
    console.log('toUser',sendUserSocket)
    socket.to(sendUserSocket).emit('msg-recieve',{message:data.message,from:data.from,type:data.type})   
 }
})
})







//APIs

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).send(errorMessage);
});
