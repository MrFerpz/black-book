const express = require('express');
const indexRouter = express();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController')
const uploadController = require('../controllers/uploadController')
const multer = require('multer');
const upload = multer();

// auth
indexRouter.post("/api/login", authController.login);
indexRouter.post("/api/signup", authController.signup);
indexRouter.get("/api/authcheck", authController.isLoggedIn);
indexRouter.get("/api/logout", authController.logout);
indexRouter.get("/api/user", authController.isLoggedIn);
indexRouter.get("/api/user/:userID", indexController.getUser);
indexRouter.get("/api/user/posts", authController.getUserPosts)
indexRouter.get("/api/:postID/likes", indexController.getLikes);
indexRouter.get("/api/:postID/comments", indexController.getComments);
indexRouter.get("/api/user/withposts/:userID", indexController.getUserWithPosts);

// posts, comments, bios, friends
indexRouter.get("/api/posts", indexController.getPosts);
indexRouter.post("/api/posts", indexController.newPost);
indexRouter.post("/api/:postID/likes", indexController.likePost);
indexRouter.post("/api/post/:postID/comment", indexController.postComment);
indexRouter.put("/api/put/:userID/bio", indexController.putBio);
indexRouter.get("/api/:userID/following", indexController.getFollowing);
indexRouter.get("/api/:userID/notfollowing", indexController.getNotFollowing);
indexRouter.put("/api/unfollow/:userID/from/:currentUserID", indexController.unfollow)
indexRouter.put("/api/follow/:userID/from/:currentUserID", indexController.follow)

// uploads
indexRouter.post("/api/avatar/:userID", upload.single('avatar'), uploadController.uploadAvatar)

module.exports = indexRouter