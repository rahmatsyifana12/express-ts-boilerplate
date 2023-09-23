/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import type { Request } from 'express';

function generateExt(originalname: string) {
    const strName = originalname.split('.');

    return strName[strName.length - 1];
}

function fileStorage(fileCategory: string) {
    return multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `images/${fileCategory}/${file.fieldname}`);
        },
        filename: function (req, file, callback) {
            callback(null, `${uuidv4()}.${generateExt(file.originalname)}`);
        },
    });
}

function fileUpload(fileCategory: string, fields: any[]) {
    return multer({
        storage: fileStorage(`${fileCategory}`),
        fileFilter(req: Request, file, callback) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                callback(null, true);
            } else {
                callback(null, false);
                callback(new Error('File type is not accepted'));
            }
        },
    }).fields(fields);
}

export default fileUpload;