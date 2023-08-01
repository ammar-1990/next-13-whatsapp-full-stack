import createError from "../util/createError.js";
import { prismadb } from "../util/prismadb.js";
import { renameSync } from "fs";

export async function addMessage(req, res, next) {
  const { message, from, to } = req.body;

  if (!message || !from || !to)
    return next(createError("something went wrong", 400));

  const getUser = onlineUsers.get(to);

  const prisma = prismadb();

  try {
    const newMessage = await prisma.messages.create({
      data: {
        senderId: +from,
        recieverId: +to,

        message,
        messageStatus: getUser ? "delivered" : "sent",
      },
      include: {
        sender: true,
        reciever: true,
      },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
    console.log(error);
  }
}

export async function getMessages(req, res, next) {
  const prisma = prismadb();
  const { from, to } = req.body;
  if (!from || !to) return next(createError("someting went wrong"), 400);

  try {
    await prisma.messages.updateMany({
      where: {
        senderId: +from,
        recieverId: +to,
      },
      data: {
        messageStatus: "read",
      },
    });

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: +from, recieverId: +to },
          { senderId: +to, recieverId: +from },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: { sender: true, reciever: true },
    });
    // console.log(messages)

    // let unreadMessages=[]
    // messages.forEach(message=>{
    //     if(message.messageStatus !=='read' && message.senderId === +to){
    //         message.messageStatus ==='read'
    //         unreadMessages.push(message.id)
    //     }
    // })

    // await prisma.messages.updateMany({
    //     where:{
    //         id:{in:unreadMessages}
    //     },
    //     data:{
    //         messageStatus:'read'
    //     }
    // })
    res.status(201).json(messages);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function addImage(req, res, next) {
  try {
    if (req.file) {
      const date = Date.now();
      const fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = prismadb();

      const { from, to } = req.query;
      const message = await prisma.messages.create({
        data: {
          message: fileName,
          senderId: +from,
          recieverId: +to,
          type: "image",
        },
      });

      return res.status(200).json(message);
    }
    res.status(400).send("no file");
  } catch (error) {
    next(error);
    console.log(error);
  }
}

export async function addAudio(req, res, next) {
  try {
    if (req.file) {
      const date = Date.now();
      const fileName = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = prismadb();

      const { from, to } = req.query;
      const message = await prisma.messages.create({
        data: {
          message: fileName,
          senderId: +from,
          recieverId: +to,
          type: "audio",
        },
      });

      return res.status(200).json(message);
    }
    res.status(400).send("no file");
  } catch (error) {
    next(error);
    console.log(error);
  }
}

export async function startUp(req, res, next) {
  const { from } = req.params;
  console.log("startUp");
  console.log(from);

  const prisma = prismadb();

  try {
    const user = await prisma.user.findUnique({
      where: { id: +from },
      include: {
        sentMessages: {
          include: {
            sender: true,
            reciever: true,
          },
          orderBy: { createdAt: "desc" },
        },
        recievedMessages: {
          include: {
            sender: true,
            reciever: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    const messages = [...user.sentMessages, ...user.recievedMessages];

    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const users = new Map();

    const messageStatusChange = [];

    messages.forEach((msg) => {
      const isSender = +msg.senderId === +from;

      const calculatedId = isSender ? msg.recieverId : msg.senderId;

      if (msg.messageStatus === "sent") {
        messageStatusChange.push(msg.id);
      }
      const { id, type, message, messageStatus, senderId, recieverId } = msg;
      if (!users.get(calculatedId)) {
      

        let user = {
          messageId: id,
          type,
          message,
          messageStatus,
          senderId,
          recieverId,
        };

        if (isSender) {
          user = {
            ...user,
            ...msg.reciever,
            createdAt:msg.createdAt,
            totalUnreadMessages: 0,
          };
        } else {
          user = {
            ...user,
            ...msg.sender,
            createdAt:msg.createdAt,
            totalUnreadMessages: messageStatus !== "read" ? 1 : 0,
          };
        }
     
        users.set(calculatedId, { ...user });
      } else if (messageStatus !== "read" && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, {
          ...user,
          totalUnreadMessages: user.totalUnreadMessages + 1,
        });
      }
    });

    if (messageStatusChange.length > 0) {
      await prisma.messages.updateMany({
        where: {
          id: {
            in: messageStatusChange,
          },
        },
        data: {
          messageStatus: "delivered",
        },
      });
    }

    return res
      .status(200)
      .json({
        users: Array.from(users.values()),
        onlineUsers: Array.from(onlineUsers.keys()),
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
