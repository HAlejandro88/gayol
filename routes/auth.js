const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');
const { register, login, getMe, viewAvatar, findAllUsers, verifyToken, adminTokenVerify, updateUser } = require('../controllers/auth');
const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');


    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/users'),
        filename: (req, file, cb, filename) => {
            console.log(file.originalname);
            cb(null, uuid() + path.extname(file.originalname));
        }
    })
    const upload = multer({storage}).single('image')


router.route('/register')
        .post(register);

router.route('/login')
        .post(login);

router.route('/users')
        .get(protect,authorize('admin'),findAllUsers);

router.get('/me', protect, getMe);


router.route('/verify/:token')
        .get(verifyToken);
router.route('/verify/admin/:token')
    .get(adminTokenVerify);

router.route('/image/:id')
    .put(upload,updateUser);

router.route('/avatar/:img')
    .get(viewAvatar);

module.exports = router;
