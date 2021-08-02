const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');
const asyncHandler = require('../middlewares/async');
const jwt = require('jsonwebtoken');
const fs = require('fs');

//@desc   Register user
//@route  POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async(req,res,next) => {

    const user = await User.create(req.body);

    //sendTokenResponse(user, 200, res);

    res.status(201).json({
        success: true,
        data: user
    });
})

//@desc   POST Login
//@route  POST /api/v1/auth/login
//@access Public
exports.login = asyncHandler(async(req,res,next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('por favor inserta usuario o contraseña', 401));
    } 

    const user = await User.findOne({ email }).select('+password'); // agrega el password eliminado

    if (!user) {
        return next(new ErrorResponse('Credenciales Invalidas', 401));
    } 


    // verifico el password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('credenciales Invalidas', 401));
    }

    // Creo token
    sendTokenResponse(user, 200, res);
})


const sendTokenResponse = (user, satusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(satusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}

//@desc   GET current logged in user
//@route  POST /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async(req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    })
})

//@desc   GET current logged in user
//@route  POST /api/v1/register/:id/upload
//@access Private
exports.userPhotoUpload = asyncHandler(async (req,res,next) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse('este no es un usuario registrasdo', 401));
    }

    user = await User.findOneAndUpdate(req.params.id, req.file, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: user
    })
}) 


exports.findAllUsers = asyncHandler(async(req,res,next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
})


exports.verifyToken = asyncHandler(async(req,res,next) => {
    token = req.params.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            return res.status(200).json({
                verify: true
            })
        }
    } catch (error) {
        return res.status(401).json({
            verify: false,
            message: 'Token no coincide'
        })
    }
})

exports.renewToken = asyncHandler(async(req,res,next) => {
    
})


exports.adminTokenVerify = asyncHandler(async (req,res,next) => {
    let token = req.params.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded.id);
        console.log(user);
        if (user.role === 'admin') {
            return res.status(200).json({
                admin: true
            });
        } else if (user.role === 'vendedor') {
            return res.status(200).json({
                sale: true
            })
        } else if (user.role === 'juridicoMaster') {
            return res.status(200).json({
                juridico: true
            })
        } else {
            return res.status(401).json({
                verify: false,
                message: `el usuario no es admin`
            })
        }
    } catch (error) {
        return res.status(401).json({
            verify: false,
            message: 'Token no coincide'
        })
    }
})

exports.updateUser = asyncHandler(async (req,res,next) => {
    let user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorResponse('no se pudo actualizar',404));
    }

    console.log(req.file);

    const body = {
        image: req.file.filename,
        ...req.body
    }

    user = await User.findByIdAndUpdate(req.params.id, body, { new: true });

    res.status(200).json({
        success: true,
        data: user
    })
});

exports.viewAvatar = (req,res,next) => {
    let img = req.params.img;
    let pathImage = path.resolve(__dirname, `../public/users/${img}`);
    console.log(pathImage,'image');

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage)
    } else {
       let pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
        res.sendFile(pathNoImagen);
    }
}
