import multer from 'multer'
import { FILESIZE } from './config.js'
import {__dirname} from './app.js'

import * as path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Ruta donde se guardaran los archivos
    cb(null, './src/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  }
})

export const upload = multer({
    //Configuracion del tamaño de imagen
  storage: storage,
  limits: {
    fileSize: FILESIZE * 1024 * 1024,

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
