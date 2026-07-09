const express =require('express');

const router= express.Router();

const {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getAllUrls,
    deleteUrl
} = require("../controllers/urlController");


router.post("/shorten",createShortUrl);
router.get("/urls", getAllUrls);
router.get("/stats/:shortCode", getUrlStats);
router.delete("/delete/:id", deleteUrl);
router.get("/:shortCode", redirectUrl);






module.exports=router;