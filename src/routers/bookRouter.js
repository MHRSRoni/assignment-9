//dependencies
const router = require('express').Router()

//controller
const { getallbooks, getbookbyid, createbook, updatebook, deletebook } = require("../controllers/bookController");

router.get("/books", getallbooks);

router.post("/books", createbook);

router.get("/books/:id", getbookbyid);

router.put("/books/:id",updatebook);

router.delete("/books/:id", deletebook);



module.exports = router; 