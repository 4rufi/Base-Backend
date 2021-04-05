const { Router } = require('express');
const { check } = require('express-validator');
const {
  uploadImage,
  updateImageCloudinary,
  showImage,
} = require('../controllers');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFileUpload } = require('../middlewares');

const router = Router();

router.post('/image', validateFileUpload, uploadImage);

router.put(
  '/:collection/:id',
  [
    validateFileUpload,
    check('id', 'id not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImageCloudinary
);

router.get(
  '/:collection/:id',
  [
    check('id', 'id not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  showImage
);
module.exports = router;
