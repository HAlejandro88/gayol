const MasterList = require('../models/MasterList');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');


exports.addMasterList = asyncHandler(async(req,res,next) => {
    const masterList = await MasterList.create(req.body);
    return res.status(201).json({
        success: true,
        message: 'lista Agregada',
        data: masterList
    })
})

exports.getAllMasterList = asyncHandler(async (req,res,next) => {
    const masterList = await MasterList.find()
    return res.status(200).json({
        success: true,
        count: masterList.length,
        data: masterList
    })
})

exports.findOneMasterList = asyncHandler(async (req,res,next) => {
    const masterList = await MasterList.findById(req.params.id);
    if (!masterList) {
        return next(new ErrorResponse(`no existe una lista maste con este id ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: masterList
    })
});


exports.updateMasterList = asyncHandler(async (req,res,next) => {
    let  masterList = await MasterList.findById(req.params.id);
    if (!masterList) {
        return next(new ErrorResponse(`no existe una lista maste con este id ${req.params.id}`, 404));
    }
    masterList = await MasterList.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    return res.status(200).json({
        success: true,
        message: `se cambio ${req.body}`,
        data: masterList
    })
})

exports.deleteMasterList = asyncHandler(async (req,res,next) => {
    let  masterList = await MasterList.findById(req.params.id);
    if (!masterList) {
        return next(new ErrorResponse(`no existe una lista maste con este id ${req.params.id}`, 404));
    }

    masterList.remove();

    return res.status(200).json({
        success: true,
        message: `se elimino correcatemente`,
        data: {}
    })
})
