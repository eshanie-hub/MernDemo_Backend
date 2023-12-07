const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//adding data
router.route("/add").post((req, res) => {
    const topic = req.body.topic;
    const description = req.body.description;
    const postCategory = req.body.postCategory;

    const newPost = new Posts({
        topic,
        description,
        postCategory
    })

    newPost.save().then(() =>{
        res.json("Post added")
    }).catch((err) => {
        console.log(err);
    })
})


//get data
router.route("/").get((req, res) => {
    Posts.find().then((posts) => {
        res.json(posts)
    }).catch((err) => {
        console.log(err)
    })
})


//updating data
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {topic, description, postCategory} = req.body;

    const updatePosts = {
        topic,
        description,
        postCategory
    }

    const update = await Posts.findByIdAndUpdate(userId, updatePosts)
    .then(() => {
        res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) 
})


//delete
router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Posts.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
     }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})


//get one user
// router.route("/get/:id").get(async (req, res) => {
//     let userId = req.params.id;

//     const user = await Posts.findById(userId)
//     .then((poster) => {
//         res.status(200).send({status: "user fetched", poster})
//     }).catch(() => {
//         console.log(err.message);
//         res.status(500).send({status: "Error with get user", error: err.message});
//     })
// })

router.route("/get/:id").get((req, res) => {
    let postId = req.params.id;

    Posts.findById(postId).then((posts) => {
        res.json(posts)
    }).catch((err) => {
        console.log(err)
    })

})

module.exports = router; 