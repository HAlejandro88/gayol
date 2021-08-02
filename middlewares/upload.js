const multer = require('multer');
const path = require('path');
const uuid = require('uuid');


    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../public/docs/uploads'),
        filename: (req, file, cb, filename) => {
            console.log(file.originalname);
            cb(null, uuid() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage });

    module.exports = {
        upload
    }



