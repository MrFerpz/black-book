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
                    id: true
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
                    username: true,
                    id: true
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
        },
        include: {
            author: {
                select: {
                    username: true,
                    id: true
                }
            }
        }
    })
}

async function postComment(postID, userID, content) {
    return await prisma.comment.create({
        data: {
            content: content,
            authorId: userID,
            postId: postID
        }
    })
}

async function getUserPosts(userID) {
    return await prisma.post.findMany({
        where: {
            authorId: userID
        },
        include: {
            author: {
                select: {
                    username: true
                }
            }
        }
    })
}

async function putBio(userID, content) {
    return await prisma.user.update({
        where: {
            id: userID
        },
        data: {
            bio: content
        }
    })
}

async function getUser(userID) {
    console.log(userID);
    return await prisma.user.findUnique({
        where: {
            id: userID
        },
        select: {
            username: true,
            id: true,
            bio: true
        }
    })
}

async function getUserWithPosts(userID) {
    return await prisma.user.findUnique({
        where: {
            id: userID
        },
        select: {
            username: true,
            id: true,
            bio: true,
            followedBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            following: { 
                select: {
                    id: true,
                    username: true
                }
            },
            authoredPosts: {
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })
}

async function getFollowing(userID) {
    return await prisma.user.findUnique({
        where: {
            id: userID
        },
        select: {
            following: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })
}

async function getNotFollowing(userID) {
    // Get the IDs of users that userID is following
    const followingData = await prisma.user.findUnique({
        where: {
            id: userID
        },
        select: {
            following: {
                select: {
                    id: true
                }
            }
        }
    });
    
    // put IDs in array
    const followingIds = followingData?.following.map(user => user.id) || [];
    
    // Find all users where ID is not in the following list and not the user themselves
    return await prisma.user.findMany({
        where: {
            AND: [
                { id: { not: userID } }, 
                { id: { notIn: followingIds } }
            ]
        },
        select: {
            id: true,
            username: true
        }
    });
}

async function follow(userID, currentUserID) {
    return await prisma.user.update({
        where: {
            id: currentUserID
        },
        data: {
            following: {
                connect: {
                    id: userID
                }
            }
        }
    })
}

async function unfollow(userID, currentUserID) {
    return await prisma.user.update({
        where: {
            id: currentUserID
        },
        data: {
            following: {
                disconnect: {
                    id: userID
                }
            }
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
    getComments,
    postComment,
    getUserPosts,
    putBio,
    getUser,
    getUserWithPosts,
    getFollowing,
    getNotFollowing,
    follow,
    unfollow
}
