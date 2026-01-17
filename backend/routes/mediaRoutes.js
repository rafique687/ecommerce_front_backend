const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mediaController = require('../controllers/mediaController');
const {
  uploadMedia,
  viewMedia,
  singleMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');

// Ensure directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const mediaType = req.body.type;
        let folder = '';

        if (mediaType === 'image') folder = 'uploads/image';
        else if (mediaType === 'video') folder = 'uploads/video';
        else if (mediaType === '3D') folder = 'uploads/3D';
        else return cb(new Error('Invalid media type'), null);

        ensureDir(folder);
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.post('/uploadmedia', upload.array('file'), mediaController.uploadMedia);
router.get('/viewmedia', mediaController.viewMedia);
router.get('/single/:id',mediaController.singleMedia);
//router.put('/update/:id',mediaController.update);
router.put('/update/:id', upload.array('file'), mediaController.updateMedia);
router.delete('/delete/:id',mediaController.deleteMedia);



module.exports = router;
