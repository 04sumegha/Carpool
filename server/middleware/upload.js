const util = require("util");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

let uploadFile = multer({
  storage: storage
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;