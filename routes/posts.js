// THIS BACK-END ROUTE DEALS WITH POSTS

// Modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require Validation
const validatePost = require('../validation/post');

// Require Post model
const Post = require('../models/Posts');
// Require Profile model
const Profile = require('../models/Profile');

// Get posts
// GET request
// Public route
router.get('/', (req, res) => {
    Post
        .find()                                                                     // Find the posts
        .sort({ date: -1 })                                                         // Sort posts by date - descending 
        .then(posts => res.json(posts))                                             // If everything is fine, get posts and send back a successful response with the posts
        .catch(err => res.status(404).json({ notfound: 'No posts found' }));    // If there is an error, get the error and display it in the console
});

// Get post by id
// GET request
// Public route
router.get('/:id', (req, res) => {
    Post
        // Find post by id
        .findById(req.params.id)
        // Check post
        .then(post => {
            // If the post exists, return the response in json format
            // If it does not exist, return a 404 status error
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ notfound: 'No post found with that id' });
            }
        })
        .catch(err =>
            res.status(404).json({ notfound: 'No post found with that id' })
        );
});

// Create post
// POST request
// Private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePost(req.body);

    // Check validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    // Create a new post with the following parameters
    const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        category: req.body.category,
        user: req.user.id
    });

    newPost
        .save()                             // Save post
        .then(post => res.json(post))       // If everything is fine, get post and send back a successful response with the post
        .catch(err => console.log(err));    // If there is an error, get the error and display it in the console
});

// Like post
// POST request
// Private route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post
            // Find the post through its id
            .findById(req.params.id)
            // If the user has already liked the post, return a 400 status error
            // If the user has NOT already liked the post, add the user's id to the "likes" array
            .then(post => {
                if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                    return res.status(400).json({ alreadyliked: 'User has already liked this post' });
                }

                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ notfound: 'Post not found' }));
    });
});

// Dislike post
// POST request
// Private route
router.post('/dislike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post
            // Find post through its id
            .findById(req.params.id)
            // If the user has NOT already liked the post, return a 400 status error
            // If the user has liked the post, delete the index from the "likes" array
            .then(post => {
                if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                    return res.status(400).json({ notliked: 'You have not liked this post yet' });
                }

                const deleteIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                post.likes.splice(deleteIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ notfound: 'Post not found' }));
    });
});

// Update post
// PUT request
// Private route
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePost(req.body);
 
    // Check vaidation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post
        .findById({_id: req.params.id})
        .then(post => {
            // Check post owner
            // If the user who tries to update the post is not the owner of the post, return a 401 status error
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorizated'})
            }
            post.text = req.body.text
            post.title = req.body.title
    
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ notfound: 'No post found' }))
});

// Delete post
// DELETE request
// Private route
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post
            // Find the post by its id
            .findById(req.params.id)
            .then(post => {
                // Check for post owner
                // If the user who tries to delete the post is not the owner of the post, return a 401 status error
                if (post.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'User not authorized' });
                }

                // Remove post
                // Return the response { success: true } in json format
                post.remove().then(() => res.json({ success: true }));
            })
            .catch(err => res.status(404).json({ notfound: 'No post found' }));
    });
});

// Export this route as a module
module.exports = router;