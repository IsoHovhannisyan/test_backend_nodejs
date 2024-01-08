const express = require('express');
const router = express.Router();
const { add, edit, remove, all, User } = require("../controllers/users");



router.get('/', all);
router.get('/:id', User);
router.post('/add', add );
router.post("/remove/:id", remove);
router.put("/edit/:id", edit);


module.exports = router;
