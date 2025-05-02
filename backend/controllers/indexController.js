const prisma = require('prisma')
// reminder, controller needs to return something (res.json, res.status, res.send etc)

async function getAllPosts() {
    return await prisma.getAllPosts()
}

module.exports = { getAllPosts }