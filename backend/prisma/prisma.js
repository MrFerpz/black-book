const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function findUsers() {
    return await prisma.user.findMany();
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

async function getAllPosts() {
    return await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true,
                    name: true
                }
            }
        }
    })
}

async function newPost(userID, content) {
    return await prisma.post.create({
        data: {
            authorId: userID,
            content: content
        }
    })
}

async function likePost(postID, userID) {
    return await prisma.post.update({
        where: {
            id: postID
        },
        data: {
            likedBy: {
                connect: {
                        id: userID
                }
            }
        }
    })
}

async function getLikes(postID) {
    const likesObject = await prisma.post.findUnique({
        where: {
            id: postID
        },
        select: {
            likedBy: {
                select: {
                    username: true
                }
            }
        }
    })
    return likesObject["likedBy"];
}

async function getComments(postID) {
    return await prisma.comment.findMany({
        where: {
            postId: postID
        }
    })
}

module.exports = { 
    findUsers, 
    signup, 
    findUser, 
    findUserByName,
    getAllPosts,
    newPost,
    likePost,
    getLikes,
    getComments
}
