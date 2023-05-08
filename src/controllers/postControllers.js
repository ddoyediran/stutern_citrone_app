
const Post = require("../models/post");
const Reply = require("../models/reply");
const { StatusCodes } = require("http-status-codes");


/** This is the implementation getting all Post according to track  */
//@route GET method - /api/v1/users/posts
const getAllPostByTrack = async (req, res) => {

};

/** This is the implementation for getting a single post  */
//@route GET method - /api/v1/users/post/:id
const getSinglePost = async (req, res) => {

};

/** This is the implementation for creating a Post */
//@route POST method - /api/v1/users/post/create
const createPost = async (req, res) => {

};

/** This is the implementation for deleting a post a single post  */
//@route GET DELETE - /api/v1/users/post/:id
const deletePost = async (req, res) => {

};

module.exports = { 
    getAllPostByTrack, 
    getSinglePost, 
    createPost, 
    deletePost 
}