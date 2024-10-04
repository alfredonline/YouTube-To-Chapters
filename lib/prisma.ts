import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Remove the namespace declaration and use module augmentation
declare global {
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
