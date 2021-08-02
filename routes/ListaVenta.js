const express = require('express');
const { getList, addItemList,
        listFindItem, ListChangeStatus,
        listPhotoUpload, exportListToExcel,
        writeExcelData, findListOfMaster, findListOfMasterByName, viewImageList, findListVendidas, AdvanceSearch, findListDownd } =  require('../controllers/listaVentas');
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');

const { protect, authorize } = require('../middlewares/auth');

const advanceResults = require('../middlewares/advanceResults');
const ListaVenta = require('../models/listaVentas');


//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/docs'),
    filename: (req, file, cb, filename) => {
        console.log(file.originalname);
        cb(null, file.originalname );
    }
})

const upload = multer({storage})
const excel = upload.single('file');
const photo = upload.single('file');

router.route('/:id/image')
        .put(photo,listPhotoUpload);


router.route('/')
        .get(advanceResults(ListaVenta), getList)
        //.get(getList)
        .post(addItemList);

router.route('/:id')
        .get(listFindItem);

router.route('/update/:id')
        .put(ListChangeStatus);

router.route('/export')
        .post(exportListToExcel);

router.route('/upload')
    .post(excel,writeExcelData);

/*router.route('/master/:id')
    .get(findListOfMaster)*/

router.route('/master/:name')
    .get(findListOfMasterByName);

router.route('/list/photo/:img')
    .get(viewImageList);


router.route('/list/vendida')
    .get(findListVendidas);

router.route('/list/down')
    .get(findListDownd)

/*router.route('/list/search')
    .post(AdvanceSearch)*/



/*router.route('/exceptions')
        .post(Exceptions);*/


module.exports = router;
