const express = require('express');
const { addDocuments, findDocWithListItem, updateDocuments, getAllDocuments,viewDocuments } = require('../controllers/documentsContoller');
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid/v4');
const path = require('path');

const { protect, authorize } = require('../middlewares/auth');

//multer
 const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/docs'),
    filename: (req, file, cb, filename) => {
        console.log(file.originalname);
        cb(null, uuid() + path.extname(file.originalname));
    }
})

const upload = multer({storage})
// TODO: Change fields
const docsUpload = upload.fields([
       { name: 'image', maxCount: 1 },
       { name: 'file', maxCount: 3 }
   ]);

router.route('/')
    .get(getAllDocuments)
    .post(docsUpload,addDocuments);

router.route('/list/:id')
        .get(findDocWithListItem);

router.route('/document/:img')
            .get(viewDocuments);

module.exports = router;
