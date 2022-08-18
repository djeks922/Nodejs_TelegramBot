import multer from 'multer'
import fs from 'fs/promises'
import logger from '../logger/index.js'
// const tinify = require("tinify");
// require('dotenv').config

// const ApiError = require('../exceptions/apiError');
// const winston = require('../logger/logger');

// tinify.key = process.env.tinify_key;

/**
 * Storage 
 * */ 
let storageIMG = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/proposal");
    },
    filename: (req, file, cb) => {
        const {consumerChatID} = req.query
        cb(null,  Date.now()+'-'+'-'+consumerChatID+file.originalname.trim());
    },
});

/**
 *  Limits option 
*/ 

/**
 *  File filter
*/ 

function fileFilter(req, file, cb) {
    // let fileEnum = ['image/png', 'image/jpg', 'image/jpeg']

    if (!this.includes(file.mimetype)) {
        cb(new Error('MEMETYPE_NOT_VALID'), false);
    } else {
        cb(null, true);
    }

}


let image = ['image/png', 'image/jpg', 'image/jpeg','application/pdf']

export let uploadProposalImages = multer({storage: storageIMG, fileFilter: fileFilter.bind(image)}).array('pImages',10)

export const deleteOldImages = async(paths) => {
    logger.debug('multer.deleteOldImages --- started')
    if(typeof paths !== typeof []) {
        // console.log('not array')
        paths = [paths]
        // console.log(paths)
    }
    
    try {
        // console.log(paths)
        for (let path of paths){
            path = 'public/' + path.split(process.env.URL)[1]
            await fs.unlink(path)
        }

        logger.debug('multer.deleteOldImages --- success')
    } catch (error) {
        logger.error(error)
    }
    
}

// export const compressImages = async (req, res, next) => {
//     winston.debug('multer.compression -- start');

//     for (let i = 0; i < req.files.length; i++) {
//         // First compression

//         try {
//             let source = tinify.fromFile(req.files[i].path);

//             await source.toFile(req.files[i].path.replace(req.files[i].originalname, `_optimized_${req.files[i].originalname}`));
//             // deleting the original file
//             await fs.unlink(req.files[i].path);
//             // replacing the path with compressed one
//             req.files[i].path = req.files[i].path.replace(req.files[i].originalname, `_optimized_${req.files[i].originalname}`)

//             // Second compression
//             let source2 = tinify.fromFile(req.files[i].path)
//             await source2.toFile(req.files[i].path.replace(`_optimized_${req.files[i].originalname}`, `_optimized_2_${req.files[i].originalname}`))

//             // deleting the 1st compressed image
//             await fs.unlink(req.files[i].path);
//             //replacing the path with 2nd compressed one
//             req.files[i].path = req.files[i].path.replace(`_optimized_${req.files[i].originalname}`, `_optimized_2_${req.files[i].originalname}`)
//         } catch (error) {
//             throw ApiError.GeneralException()
//         }


//     }


//     winston.debug('multer.compression -- success');
//     next();
// };