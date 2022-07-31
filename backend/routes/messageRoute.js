const express = require("express");
const {
  addMessage,getAllMessage
} = require("../controllers/messageController");
const router = express.Router();

router.post("/addMsg", addMessage);
router.post("/getMsg", getAllMessage);

module.exports = router;
