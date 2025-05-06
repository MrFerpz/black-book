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
   const postID = Number(req.params.postID);
   const userID = Number(req.body.userID);
   try {
      await prisma.likePost(postID, userID);
   } catch(err) {
      console.log(err);
      return err
   }
   return res.json("Liked post.")
}

async function getLikes(req, res) {
   const postID = Number(req.params.postID);
   try {
      const likes = await prisma.getLikes(postID);
      return res.json(likes)
   } catch(err) {
      console.log(err);
      return err
   }
}

module.exports = { getPosts, newPost, likePost, getLikes }