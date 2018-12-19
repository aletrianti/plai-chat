// THIS BACK-END ROUTE DEALS WITH COMMENTS

// Modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Validation
const validatePost = require('../validation/post');

// Require Post model
const Post = require('../models/Posts');

// Add comment to post
// POST request
// Private route
router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    // Check validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post
        // Find a post through its id
        .findById(req.params.id)
        // Create a comment with the following parameters and add to the "comments" array
        .then(post => {
            const newComment = {
                text: req.body.text,
                title: req.body.title,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ notfound: 'Post not found' }));
});

// Like comment
// POST request
// Private route
/*
router.post('/:id/like/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post
            // Find the post through its id
            .findById(req.params.id)
            // If the user has already liked the comment, return a 400 status error
            // If the user has NOT already liked the comment, add the user's id to the "likes" array
            .then(post => {
                if (comment.likes.filter(like => like.comment.toString() === req.user.id).length > 0) {
                    return res.status(400).json({ alreadyliked: 'User has already liked this comment' });
                }

                comment.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ notfound: 'Comment not found' + err }));
    });
});
*/

// Delete comment from post
// DELETE request
// Private route
router.delete('/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post
        // Find a post through its id
        .findById(req.params.id)
        // If the comment related to this post does NOT exist, return a 404 error status
        // If the comment related to this post exists, remove the index from the "comments" array
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ notfound: 'This comment does not exist' });
            }

            const deleteIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

            post.comments.splice(deleteIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ notfound: 'Post not found' }));
});

// Export this route as a module
module.exports = router;