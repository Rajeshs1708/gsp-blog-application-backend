const express = require("express");
const router = express.Router();
const { add_blog, get_blogs, edit_blog, delete_blog, get_blog, upload_file, get_image } = require("../Controllers/blog-controller");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.post("/add-blog", add_blog);
router.get("/get-blogs", get_blogs);
router.get("/get-blog/:_id", get_blog);
router.put("/edit-blog/:_id", edit_blog);
router.delete("/delete-blog/:_id", delete_blog);

router.post("/upload", upload.single("file"), upload_file);
// router.get("/get-image", get_image);

module.exports = router;