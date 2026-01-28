
const router = require("express").Router();
const { createPaste, getPaste } = require("../controllers/pasteController");

router.post("/", createPaste);
router.get("/:id", getPaste);

module.exports = router;
