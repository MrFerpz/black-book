const prisma = require('../prisma/prisma');
// reminder, controller needs to return something (res.json, res.status, res.send etc)

async function getPosts(req, res) {
   const posts = await prisma.getAllPosts();
   console.log(posts)
   return res.json(posts)
}

module.exports = { getPosts }