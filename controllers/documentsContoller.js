const docsModel = require('../models/documentsModel');
const listSales = require('../models/listaVentas');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');
const fs = require('fs');

exports.addDocuments = asyncHandler(async(req, res, next) => {
    console.log(req.files, 'files');
    let newDocuments = {
        ...req.body,
        ...req.files,
    }
    const docs = await docsModel.create(newDocuments);
    res.status(201).json({
        success: true,
        data: docs
    })
})

exports.findDocWithListItem = asyncHandler(async(req,res,next) => {
    const listItem = await listSales.findById(req.params.id);
    if (!listItem) {
        return next(new ErrorResponse('no se encontro este elemento', 404));
    }

    const docs = await docsModel.find({ listItem }).populate('listItem');
    if (!docs) return next(new ErrorResponse('no hay doccumentos para esta propiedad', 400))
    res.status(200).json({
        success: true,
        data: docs
    })
})

exports.updateDocuments = asyncHandler(async(req,res,next) => {
    let docs = await docsModel.findOne(req.params.id);
    if (!docs) throw next(new ErrorResponse('no se encotraron documentos', 400));
    docs = await docsModel.findOneAndUpdate(req.params.id, req.files, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: docs
    });
})

exports.getAllDocuments = asyncHandler(async(req,res,next) => {
    const documents = await docsModel.find().populate('listItem');
    res.status(200).json({
      success: true,
      data: documents
    })
})


exports.viewDocuments = (req,res,next) => {
    let img = req.params.img;
    let pathImage = path.resolve(__dirname, `../public/docs/${img}`);
    console.log(pathImage,'doc');

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage)
    } else {
       let pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImagen);
    }
}