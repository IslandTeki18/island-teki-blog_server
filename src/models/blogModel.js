import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const TagSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: false,
    },
    content: {
        type: String,
        required: true,
    },
});

const CategorySchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
});

const PostSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        postImage: {
            type: String,
        },
        summary: {
            type: String,
        },
        tldr: {
            type: String,
        },
        published: {
            type: Boolean,
            default: false,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
            required: true,
        },
        thumbsUp: {
            type: Boolean,
            required: false,
            default: false,
        },
        postComments: [CommentSchema],
        postTags: [TagSchema],
        postCategories: [CategorySchema],
        postType: {
            isFitnessPost: {
                type: Boolean,
                required: true,
                default: true,
            },
            isCodingPost: {
                type: Boolean,
                required: true,
                default: true,
            },
            isTravelPost: {
                type: Boolean,
                required: true,
                default: true,
            },
            isFoodPost: {
                type: Boolean,
                required: true,
                default: true,
            },
            isGamingPost: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
