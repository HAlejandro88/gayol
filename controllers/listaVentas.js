const ListaVenta = require('../models/listaVentas');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs-extra');
const fileSystem = require('fs');



exports.getList = asyncHandler(async(req,res,next) => {
    const list = await ListaVenta.find({  vendida: false  });
    res.status(200).json({
        success: true,
        data: list
    })
    //res.status(200).json(res.advanceResults);
})


exports.addItemList = asyncHandler(async (req,res,next) => {
    const list = await ListaVenta.create(req.body);
    res.status(201).json({
        success: true,
        data: list
    })
})

exports.listFindItem = asyncHandler(async (req,res,next) => {
    const list = await ListaVenta.findById(req.params.id);
    if (!list) {
        return next(new ErrorResponse('este no es un elemento de la lista', 404))
    }
    res.status(200).json({
        success: true,
        data: list
    })
})

//TutiMaya14

exports.ListChangeStatus = asyncHandler(async (req,res,next) => {
    let list = await ListaVenta.findById(req.params.id);
    if (!list) {
        return next(new ErrorResponse('este no es un elemento de la lista', 404))
    }
    let body = {
        ...req.body,
        ...req.file
    }
    list = await ListaVenta.findByIdAndUpdate(req.params.id, body, {
        new: true
    });
    res.status(200).json({
        success: true,
        data: list
    })
})

exports.deleteList = asyncHandler(async(req,res,next) => {
    const list = await ListaVenta.findById(req.params.id);
    if (!list) {
        return next(new ErrorResponse(`este id no existe ${req.params.id}`, 404));
    }

    list.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
})

exports.listPhotoUpload = asyncHandler(async (req,res,next) => {
    let list = await ListaVenta.findById(req.params.id);

    if (!list) {
        return next(new ErrorResponse('no es un id valido para la lista', 400))
    }

    let update = {
        image: req.file.filename
    }


    list = await ListaVenta.findByIdAndUpdate(req.params.id, update, {
        runValidators: true,
        new: true
    })


    res.status(200).json({
        success: true,
        data: list
    })
})

exports.viewImageList = (req,res,next) => {
    let img = req.params.img;
    let pathImage = path.resolve(__dirname, `../public/docs/${img}`);
    console.log(pathImage,'image');

    if (fileSystem.existsSync(pathImage)) {
        res.sendFile(pathImage)
    } else {
        let pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImagen);
    }
}

exports.exportListToExcel = asyncHandler(async (req,res,next) => {
    // FIXME: WATCH IF FUNCTION NOT SHOW WITH ASYNC
    try {
        let newBook = xlsx.utils.book_new();
        let sheet = xlsx.utils.json_to_sheet(req.body);
        xlsx.utils.book_append_sheet(newBook,sheet, `lista`);
        let name = `Lista_Ventas.xlsx`;
        xlsx.writeFile(newBook, name);
        await fs.move(name, `./public/docs/${name}`, (err) => {
            if (err) return console.error(err);
        });
        //res.download(name);
        res.status(201).json({
            success: true,
            message: 'file created'
        })
    } catch (error) {
        next(new ErrorResponse(`no se pudo eviar el archivo`, 400));
    }
});

exports.dowloadExcelFile = asyncHandler(async (req,res,next) => {

})


exports.filterList = asyncHandler(async(req,res,next) => {
    try {

    } catch (error) {
        
    }
})


exports.writeExcelData = asyncHandler(async(req,res, next) => {
    try {
        const listBook = xlsx.readFile('./public/docs/listaVentas.xlsx');
        let workSheet = listBook.Sheets["List"] ;
        let listJson = xlsx.utils.sheet_to_json(workSheet);
        console.log(listJson, 'list');
        listJson.map(async (item) => {
            const data = await ListaVenta.create(item);
            return data
        })

        return res.status(201).json({
            success: true,
            message: 'se esta guardado el archivo espere un momento'
        })


    } catch(error) {
        return next(new ErrorResponse('no se pudo subir el archivo', 400));
    }

})

exports.findListOfMaster = asyncHandler(async (req,res,next) => {
    let id = req.params.id;
    const list = await ListaVenta.find({ lista: id, vendida: false })
    if (!list) {
        return next(new ErrorResponse(`no se encontro esta lista`, 404));
    }

    res.status(200).json({
        success: true,
        data: list
    })
})


exports.findListOfMasterByName = asyncHandler(async (req,res,next) => {
    let name = req.params.name;
    //const list = await ListaVenta.find({ lista: name })
    const list = await ListaVenta.find({ $and: [{lista: name}, { vendida: false }, {baja: false} ]})

    console.log(list.length)
    
    if (!list) {
        return next(new ErrorResponse(`no se encontro esta lista`, 404));
    }

    res.status(200).json({
        success: true,
        count: list.length,
        data: list
    })
})



exports.findListVendidas = asyncHandler(async (req,res,next) => {
    const list = await ListaVenta.find({ vendida: true});

    res.status(200).json({
        success: true,
        data: list
    })
})


exports.findListDownd = asyncHandler(async (req,res,next) => {
    const list = await ListaVenta.find({ baja: true});

    res.status(200).json({
        success: true,
        data: list
    })
})






// this is a example
// exports.Exceptions = async(req,res) => {
//    let body = req.body;
//   if (body.id === 5) {
//       res.send(true);
//   } else {
//       throw new Error({ code: 'red5' })
//   }
//}


