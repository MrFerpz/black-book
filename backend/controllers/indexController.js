const prisma = require('../prisma/prisma');
// reminder, controller needs to return something (res.json, res.status, res.send etc)

async function getPosts(req, res) {
   const posts = await prisma.getAllPosts();
   return res.json(posts)
}

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

async function likePost(req, res) {
   const postID = req.params.postID;
   const likerUsername = req.body.username;
   try {
      await prisma.likePost(postID, likerUsername);
   } catch(err) {
      console.log(err);
      return err
   }
   return res.json("Liked post.")
}

module.exports = { getPosts, newPost, likePost }