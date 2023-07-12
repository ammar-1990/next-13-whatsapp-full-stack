import { PrismaClient } from "@prisma/client"

let prisma = null

export const prismadb= ()=>{

    if(!prisma)
    {
        prisma = new PrismaClient()
    }

    return prisma
}