const prisma = require('../prisma/prisma');
// reminder, controller needs to return something (res.json, res.status, res.send etc)

async function getPosts(req, res) {
   const posts = await prisma.getAllPosts();
   console.log(posts)
   return res.json(posts)
}

// currently broken, userID undefined
async function newPost(req, res) {
   const content = req.body.content;
   const userID = Number(req.user.id);
   try {
      await prisma.newPost(userID, content);
   } catch(err) {
      console.log(err);
      return err
   }
   return res.json("Successfully added a new post.")
}

module.exports = { getPosts, newPost }