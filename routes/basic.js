const express = require("express");
const { getCategory } = require("../controller/basic");

const router = express.Router();

router.get('/getCategory', getCategory);

module.exports= router;