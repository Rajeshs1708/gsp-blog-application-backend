
const Blog = require("../Model/blog-model");
const ImageModel = require("../Model/image-model");


const add_blog = async (req, res) => {

    try {
        const post = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        });

        const result = await post.save()
        if (result) {
            res.status(200).send({
                message: "Blog post added successfully",
                data: result
            })
        }
    } catch (error) {
        console.log(error)
        res.send({ message: "Internal Server Error" });
    }
}

const get_blogs = async (req, res) => {
    try {
        const blogList = await Blog.find().sort({ _id: -1 });
        res.status(200).send(blogList);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error" });
    }
}
const get_blog = async (req, res) => {
    try {
        const blogList = await Blog.find({ _id: req.params._id });
        res.status(200).send(blogList);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error" });
    }
}

const edit_blog = async (req, res) => {
    try {
        const editBlog = await Blog.findOneAndUpdate(
            { _id: req.params._id }, // query the document
            {
                title: req.body.title,
                description: req.body.description, // data
                image: req.body.image,
            },
            { new: true } // To return the updated document
        );
        if (!editBlog) {
            return res.status(404).send({ error: "Blog not found" });
        }
        res.status(200).send({ message: "Blog edited successfully", data: editBlog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Server error" });
    }
}


const delete_blog = async (req, res) => {
    try {
        const deleteBlog = await Blog.findOneAndDelete({ _id: req.params._id });
        res.send({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Server error" });
    }
}
const upload_file = async (req, res) => {
    console.log(req.file);
    ImageModel.create({ image: req.file.filename, })
        .then(result => res.json(result))
        .catch(err => console.log(err))
}

const get_image = (req, res) => {
    ImageModel.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
}
module.exports = { add_blog, get_blogs, edit_blog, delete_blog, get_blog, upload_file, get_image };