const multer = require('multer')
const moment = require('moment')

/* Set unique file name to uploaded file */
const filename = (req, file, cb) => {
  const date = moment().format('DDMMYYYY-HHmmss_SSS')
  cb(null, `${date}-${file.originalname}`)
}

/* Creating storage*/
const initStorage = (storageName = '') => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `uploads/${storageName}`)
    }, filename
  })
  return multer({ storage })
}

const createStorage = (storageName, fieldName = 'file') => {
  return initStorage(storageName).any(fieldName)
}

module.exports = createStorage