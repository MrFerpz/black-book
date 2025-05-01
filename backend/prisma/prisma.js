const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findUsers() {
    return await prisma.users.findMany
}

async function findUser(id) {
    return await prisma.users.findFirst({
        where: {
            id: id
        }
    })
}

async function findUserByName(username) {
    return await prisma.users.findFirst({
        where: {
            username: username
        }
    })
}

async function signup(username, password) {
    return await prisma.users.create({
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
