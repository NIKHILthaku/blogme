const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path")

const blo = require("../models/blog")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./newpublic/blogimage"))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })

router.get("/addblog", (req, res) => {
    res.render("addblog", {
        here: req.user,
    });
})

router.get("/:id" ,async (req,res)=>{
    const id = await blo.findById(req.params.id);
    return res.render("blog" , {
        infouse: req.user,
        infoblog: id,
    })

})
router.post("/", upload.single("coverimage"), async (req, res) => {
try{
    const { title, body } = req.body;
    const blogs = await blo.create({
        title,
        body,
        createdby: req.user._id,
        coverimageurl: `/blogimage/${req.file.filename}`
    })
    
    return res.redirect(`/blog/${blogs._id}`)
} catch(Error){
    return res.render("addblog",{
        blogerror: "please enter all the information!"
    })
}
})

module.exports = router;