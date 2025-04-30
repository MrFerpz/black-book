const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findUsers() {
    return await prisma.users.findMany
}

console.log(findUsers)

