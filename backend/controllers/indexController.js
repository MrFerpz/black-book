const prisma = require('../prisma/prisma');
// reminder, controller needs to return something (res.json, res.status, res.send etc)

async function getPosts(req, res) {
   const posts = await prisma.getAllPosts();
   return res.json(posts)
}

async function newPostReturningID(req, res, next) {
   const content = req.body.content;
   const userID = Number(req.params.userID);
   try {
      const post = await prisma.newPost(userID, content);
      // save the postID
      req.postID = post.id
   } catch(err) {
      console.log(err);
      res.json(err)
   }
   next();
}

async function newPost(req, res) {
   const content = req.body.content;
   const userID = Number(req.body.userID);
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

async function getComments(req, res) {
   const postID = Number(req.params.postID);
   try {
      const comments = await prisma.getComments(postID);
      return res.json(comments);
   } catch(err) {
      console.log(err);
      return err
   }
}

async function postComment(req, res) {
   const postID = Number(req.params.postID);
   const userID = Number(req.body.userID);
   const content = req.body.content
   try {
      await prisma.postComment(postID, userID, content)
      return res.json("Successfully posted comment.")
   } catch(err) {
      console.log(err);
      return err
   }
}

async function putBio(req, res) {
   const userID = Number(req.params.userID);
   const content = req.body.content;
   try {
      await prisma.putBio(userID, content);
      return res.json("Successfully updated bio.")
   } catch(err) {
      console.log(err);
      return err
   }
}

async function getUser(req, res) {
   console.log("req params ID: ", req.params.userID)
   const userID = Number(req.params.userID);
   try {
      const user = await prisma.getUser(userID);
      return res.json(user)
   } catch(err) {
      console.log(err);
      return err
   }
}

async function getUserWithPosts(req, res) {
   const userID = Number(req.params.userID);
   try {
      const data = await prisma.getUserWithPosts(userID);
      return res.json(data)
   } catch(err) {
      console.log(err);
      return err
   }
}

async function getFollowing(req, res) {
   const userID = Number(req.params.userID);
   try {
      const data = await prisma.getFollowing(userID);
      return res.json(data)
   } catch(err) {
      console.log(err);
      return err
   }
}

async function getNotFollowing(req, res) {
   const userID = Number(req.params.userID);
   try {
      const data = await prisma.getNotFollowing(userID);
      return res.json(data)
   } catch(err) {
      console.log(err);
      return err
   }
}

async function follow(req, res) {
   const userID = Number(req.params.userID);
   const currentUserID = Number(req.params.currentUserID);
   try {
      await prisma.follow(userID, currentUserID);
      return res.json("Followed.")
   } catch (err) {
      console.log(err);
      return err
   }
}

async function unfollow(req, res) {
   const userID = Number(req.params.userID);
   const currentUserID = Number(req.params.currentUserID);
   try {
      await prisma.unfollow(userID, currentUserID);
      return res.json("Unfollowed.")
   } catch (err) {
      console.log(err);
      return err
   }
}

async function unlikePost(req, res) {
   const postID = Number(req.params.postID);
   const userID = Number(req.body.userID);
   try {
      await prisma.unlikePost(postID, userID);
      return res.json("Unliked post.")
   } catch(err) {
      console.log(err);
      return err
   }
}

async function checkLiked(req, res) {
   const postID = Number(req.params.postID);
   const userID = Number(req.params.userID);
   try {
      const result = await prisma.checkLiked(postID, userID);
      return res.json(result)
   } catch(err) {
      console.log(err);
      return err
   }
}

async function getPostsByFollowing(req, res) {
   const userID = Number(req.params.userID);
   try {
      const result = await prisma.getPostsByFollowing(userID);
      return res.json(result)
   } catch(err) {
      console.log(err);
      return err
   }
}

module.exports = { 
   getPosts, 
   newPost, 
   likePost, 
   getLikes, 
   getComments, 
   postComment, 
   putBio, 
   getUser, 
   getUserWithPosts,
   getPostsByFollowing,
   getFollowing,
   getNotFollowing,
   follow,
   unfollow,
   unlikePost,
   checkLiked,
   newPostReturningID
}