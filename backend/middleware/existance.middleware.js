const cacheUtil = require('../utils/cache.util');
const jwtUtil = require('../utils/jwt.util');
const StoreModel = require("../models/store.model")
const CategoryModel = require("../models/category.model")
const UserModel = require("../models/user.model")
const BlogModel = require("../models/blog.model");
const CommentModel = require("../models/comment.model");
const DealModel = require("../models/deal.model");
const ActivityModel = require('../models/activity.model')

module.exports = async (req, res, next) => {
    if (req.method == "POST") {
        try {
            var keys = Object.keys(req.body);
            if (keys.indexOf("user_id") >= 0)
                await UserModel.findById(req.body.user_id);
            if (keys.indexOf("sender_id") >= 0)
                await UserModel.findById(req.body.sender_id);
            if (keys.indexOf("receiver_id") >= 0)
                await UserModel.findById(req.body.receiver_id);
            if (keys.indexOf("store_id") >= 0 && req.body.store_id != -1)
                await StoreModel.get(req.body.store_id);
            if (keys.indexOf("category_id") >= 0 && req.body.category_id.length > 0)
                for (id of req.body.category_id)
                    await CategoryModel.get(id);
            if (keys.indexOf("blog_id") >= 0)
                await BlogModel.get(req.body.blog_id);
            if (keys.indexOf("info_html") >= 0 && req.body.info_html != -1)
                await BlogModel.get(req.body.info_html);
            if (keys.indexOf("tip_id") >= 0 && req.body.tip_id != -1)
                await BlogModel.get(req.body.tip_id);
            if (keys.indexOf("stories_id") >= 0 && req.body.stories_id != -1)
                await BlogModel.get(req.body.stories_id);
            if (keys.indexOf("about_id") >= 0 && req.body.about_id != -1)
                await BlogModel.get(req.body.about_id);
            if (keys.indexOf("faq_id") >= 0 && req.body.faq_id != -1)
                await BlogModel.get(req.body.faq_id);
            if (keys.indexOf("howto_id") >= 0 && req.body.howto_id != -1)
                await BlogModel.get(req.body.howto_id);
            if (keys.indexOf("didyou_id") >= 0 && req.body.didyou_id != -1)
                await BlogModel.get(req.body.didyou_id);
            if (keys.indexOf("activity_id") >= 0 && req.body.activity_id != -1)
                await ActivityModel.getName(req.body.activity_id);
            if (keys.indexOf("dest_id") >= 0) {
                if (req.body.type == "comment")
                    await CommentModel.get(req.body.dest_id);
                else if (req.body.type == "message")
                    await UserModel.findById(req.body.dest_id);
                else if (req.body.type == "deal")
                    await DealModel.get(req.body.dest_id);
                else if (req.body.type == "discussion" && req.body.dest_id != -1) 
                    throw new Error("The comment of discussion requires dest_id as -1")
            }
            next();
        } catch (error) {
            return res.status(400).send({
                message: error.message
            })
        }
    } else next();
}