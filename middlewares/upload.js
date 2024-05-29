import multer from "multer"
import path from 'path'
import HttpError from "../helpers/HttpError.js"

const destination = path.resolve('temp')

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, cb) {
    const uniquePreffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const filename = `${uniquePreffix}-${file.originalname}`
    cb(null, filename)
  }
})

const limits = {
  fileSize: 1024 * 1024 * 5
}

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split('.').pop()
  if (extention === 'exe') {
    return createVerify(HttpError(400, '.exe extention not allow'))
  }
  cb(null, true)
}

const upload = multer({
  storage,
  limits,
  fileFilter,
})

export default upload;