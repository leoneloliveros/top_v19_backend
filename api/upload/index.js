const { Router } = require('express');
const multer = require('multer');

const {
  uploadSingleHandler,
  uploadMultipleHandler,
} = require('./upload.controller');

const upload = multer({ dest: './temp' });

const router = Router();

router.post('/file', upload.single('image'), uploadSingleHandler);
router.post('/files', upload.array('image'), uploadMultipleHandler);

module.exports = router;
