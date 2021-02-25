const express = require("express");
const router = express.Router();
const productRouter = require('./product');
const companyRouter = require('./company');


router.use('/product', productRouter);
router.use('/company', companyRouter)



module.exports = router;