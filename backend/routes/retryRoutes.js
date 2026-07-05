const express = require("express");
const router = express.Router();

const retryController = require("../controllers/retryController");

router.post("/:id", retryController.retryJob);

module.exports = router;