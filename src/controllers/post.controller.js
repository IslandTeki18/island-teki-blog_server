import Post from "../models/ post.models.js";

//@desc     Get all posts
//@route    GET /api/posts
//@access   Public
const getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    if (!posts) return res.status(404).send({ msg: "No Posts Found." });
    res.json(posts);
  } catch (error) {
    res.status(500).send({ msg: "Could not get Posts", error: `${error}` });
    next(error);
  }
};

//@desc     Get post by ID
//@route    GET /api/posts/:id
//@access   Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) return res.status(404).send({ msg: "Uh oh! Post not found!" });
    res.json(post);
  } catch (error) {
    res.status(500).send({ msg: "Could not get post", error: `${error}` });
    next(error);
  }
};

//@desc     Creat a post
//@route    POST /api/posts
//@access   Private/Admin
const postNewPost = async (req, res, next) => {
  try {
    const post = new Post({
      author: req.user._id,
      title: req.body.title,
      postImage: "http://placehold.it/500x300",
      summary: req.body.summary,
      tldr: req.body.tldr,
      published: req.body.published,
      content: req.body.content,
      publishedAt: Date.now(),
      postComments: [],
      postTags: [],
      postCategories: [],
      postType: {
        isFitnessPost: req.body.postType.isFitnessPost,
        isCodingPost: req.body.postType.isCodingPost,
        isTravelPost: req.body.postType.isTravelPost,
        isFoodPost: req.body.postType.isFoodPost,
        isGamingPost: req.body.postType.isGamingPost,
      },
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Delete a post by ID
//@route    DELETE /api/posts/:id
//@access   Private/Admin
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ msg: "Uh oh! Post not found" });
    }
    await post.deleteOne();
    res.status(200).json({ msg: "Post Removed" });
  } catch (error) {
    res.status(500).send({
      msg: "Failed to remove post",
      error: `${error}`,
    });
    next(error);
  }
};

//@desc     Update a post by ID
//@route    PUT /api/posts/:id
//@access   Private/Admin
const updatePostById = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) return res.status(404).send({ msg: "No Post Found!" });
    post.title = req.body.title;
    post.postImage = req.body.postImage;
    post.summary = req.body.summary;
    post.tldr = req.body.tldr;
    post.published = req.body.published;
    post.content = req.body.content;
    post.updatedAt = req.body.updatedAt;
    post.postType.isFitnessPost = req.body.postType.isFitnessPost;
    post.postType.isCodingPost = req.body.postType.isCodingPost;
    post.postType.isTravelPost = req.body.postType.isTravelPost;
    post.postType.isFoodPost = req.body.postType.isFoodPost;
    post.postType.isGamingPost = req.body.postType.isGamingPost;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).send({
      msg: "Failed to Update Post",
      error: `${error}`,
    });
    next(error);
  }
};

//@desc     Create post comment
//@route    POST /api/posts/:id/comment
//@access   Private
const postCommentOnPost = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) return res.status(404).send("Post not found");
    if (post) {
      const newComment = {
        postId: post._id,
        username: req.user.username,
        title: req.body.title,
        comment: req.body.comment,
      };
      post.postComments.unshift(newComment);
      await post.save();
      res.status(200).json({ msg: "Comment Added." });
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Delete post comment by ID
//@route    DELETE /api/posts/:id/:comment_id
//@access   Private / Admin
const deleteCommentOnPost = async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) return res.status(404).send("Post not found");
    const newArr = post.postComments.filter(
      (comment) => req.params.comment_id.toString() !== comment.id.toString()
    );
    post.postComments = newArr;
    await post.save();
    res.json({ msg: "Comment Removed." });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//@desc     Update post comment by ID
//@route    PUT /api/posts/:comment_id/update
//@access   Private
const updateCommentOnPost = async (req, res, next) => {
  try {
    const post = await Post.updateOne(
      { "postComments._id": req.params.comment_id },
      {
        $set: {
          "postComments.$.title": req.body.title,
          "postComments.$.comment": req.body.comment,
        },
      }
    );
    if (!post) return res.status(404).send("Post not found.");
    res.status(200).json({ msg: "Comment Updated" });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export {
  getAllPost,
  getPostById,
  postNewPost,
  deletePost,
  updatePostById,
  postCommentOnPost,
  deleteCommentOnPost,
  updateCommentOnPost,
};
