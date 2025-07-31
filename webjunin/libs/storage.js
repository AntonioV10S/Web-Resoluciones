import multer, { diskStorage } from 'multer';

export class uploadImage{
constructor(){
const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../storage/imagenes'));
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}`)
    }
  })
  this.uploadImage = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } })
}
}
 export default uploadImage 