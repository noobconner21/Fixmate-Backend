import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { user_error, system_error } from '../responses/ErrorResponse.mjs'; 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';


        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);  
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); 
    } else {
        cb(new user_error('Only .jpg and .png files are allowed!', 400), false);  
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
})

export default upload;
