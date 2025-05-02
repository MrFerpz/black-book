const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findUsers() {
    return await prisma.user.findMany
}

async function findUser(id) {
    return await prisma.user.findFirst({
        where: {
            id: id
        }
    })
}

async function findUserByName(username) {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
    })
}

async function signup(username, password) {
    return await prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    })
}

module.exports = { 
    findUsers, 
    signup, 
    findUser, 
    findUserByName 
}
