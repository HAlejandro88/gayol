const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const News = require('../models/news');


exports.addNew = asyncHandler(async(req,res,nex) => {

    const news = await News.create(req.body);
    res.status(201).json({
        success: true,
        data: news
    })
})


exports.getAllNews = asyncHandler(async(req,res,next) => {
    const news = await News.find();
    res.status(200).json({
        success: true,
        count: news.length,
        data: news
    })
})
