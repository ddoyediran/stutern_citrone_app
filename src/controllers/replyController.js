const Post = require("../models/post");
const Reply = require("../models/reply");
const { StatusCodes } = require("http-status-codes");



/** This is the implementation for all Replies */
//@route POST method - /api/v1/users/reply/create
const allReplies = async (req, res) => {

};

/** This is the implementation for creating a Reply */
//@route POST method - /api/v1/users/reply/create
const createReply = async (req, res) => {

};

/** This is the implementation for deleting a Reply */
//@route DELETE method - /api/v1/users/reply/:id
const deleteReply = async (req, res) => {

};

module.exports = { 
    allReplies,
    createReply, 
    deleteReply 
}