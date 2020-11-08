import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  // @ts-expect-error
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  // @ts-expect-error
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// @ts-expect-error
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const minetype = filetypes.test(file.minetype);
  if (extname && minetype) {
    return cb(null, true);
  } else {
    cb('IMAGE ONLY');
  }
}

const upload = multer({
  storage,
  // @ts-expect-error
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.route('/').post(upload.single('image'), (req, res) => {
  res.send(`${req.file.path}`);
});

export default router;
