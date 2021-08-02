const express = require('express');
const { addNew, getAllNews } = require('../controllers/news');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/users'),
    filename: (req, file, cb, filename) => {
        console.log(file.originalname);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
const upload = multer({storage}).single('avatar');

const { protect, authorize } = require('../middlewares/auth');

router.route('/')
        .get(getAllNews)
        .post(protect,authorize('admin','juridicoMaster','juridico'), addNew)


module.exports = router;
