const express = require('express');
const multer = require('multer');
const { submitCar } = require('../controllers/car');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.use(authenticateUser);

router.post('/submit', upload.array('images'), submitCar);

module.exports = router;
