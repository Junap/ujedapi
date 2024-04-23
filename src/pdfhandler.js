import multer from 'multer'
import { FILESIZE, IMGSIZE } from './config.js'
import {__dirname} from './app.js'
import { pool } from './db.js'

import * as path from 'path'
import { type } from 'os'

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Ruta donde se guardaran los archivos
    cb(null, './src/uploads/publications')
  },
  filename: function (req, file, cb) {
    const {categoria} = req.body
    const categfinal = categoria.replace(/ /g, "-");
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Math.floor(Math.random() * 900000) + 100000;
    cb(null, `${uniqueSuffix}${categfinal}-${file.originalname}`)
  }
})

const imgstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      //Ruta donde se guardaran los archivos
      cb(null, './src/uploads/publications')
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
    }
  })


//Configuracion para la subida de archivos
export const fileupload = multer({
    //Configuracion del tamaño de archivo
  storage: filestorage,
  limits: {
    fileSize: FILESIZE * 1024 * 1024,

  },
  fileFilter: function (req, file, cb) {
    //Filtro para el formato de archivos
    if (path.extname(file.originalname).match(/\.(pdf)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permite el formato PDF.'), false);
    }
  }
})

//Configuracion para la subida de portadas
export const imgupload = multer({
    //Configuracion del tamaño de imagen
  storage: imgstorage,
  limits: {
    fileSize: IMGSIZE * 1024 * 1024,

  },
  fileFilter: function (req, file, cb) {
    //Filtro para el formato de imagenes
    if (path.extname(file.originalname).match(/\.(jpg|jpeg|png)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten formatos de imagen (jpg, jpeg, png).'), false);
    }
  }
})