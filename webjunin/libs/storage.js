import multer, { diskStorage } from 'multer';

export class uploadImage{
constructor(){
const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/storage/imagenes')
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}`)
    }
  })
  this.uploadImage = multer({ storage: storage })
}
}
 export default uploadImage 