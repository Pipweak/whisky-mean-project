const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogposts');

/**
 * `GET` on  endPoint : `/ping`
 * locahost:3000/api/v1/ping
 */
router.get('/ping', (req, res) => {
    res.status(200).json({
        msg: 'pong',
        data: new Date()
    });
});

/**
 * `GET` on endPoint : `/blog-posts`
 * Push all the posts from the db.
 */
router.get('/blog-posts', (req, res) => {
    Blogpost.find()
        .sort({ 'createdOn': -1 })
        .exec()
        .then(blogPosts => res.status(200).json(blogPosts))
        .catch(err => res.status(500).json({
            message: 'blog posts not found',
            error: err
        }));
});

/**
 * `GET` on endPoint : `/blog-post/:id`
 * Get the given post from the db.
 */
router.get('/blog-posts/:id', (req, res) => {
    const id = req.params.id;
    Blogpost.findById(id)
        .then(thePost => res.status(200).json(thePost))
        .catch(err => res.status(500).json({
            message: `blog post with id : ${id}, not found`,
            error: err
        }));
});

/**
 * `POST` on endPoint : `/blog-posts`
 * Push the given post into the db.
 */
router.post('/blog-posts', (req, res) => {
    console.log('req.body', req.body);
    const blogPost = new Blogpost(req.body);
    blogPost.save((err, blogPost) => {
        if (err) { return res.status(500).json(err); }
        res.status(201).json(blogPost);
    });
});

/**
 * `DELETE` on endPoint : `/blog-post/:id`
 * Delete the given post from the db.
 */
router.delete('/blog-posts/:id', (req, res) => {
    const id = req.params.id;
    Blogpost.findByIdAndDelete(id, (err, blogPost) => {
        if (err) { return res.status(500).json(err); }
        res.status(202).json({ message: `blog post with id : ${blogPost._id} was deleted.` });
    })
});

module.exports = router;