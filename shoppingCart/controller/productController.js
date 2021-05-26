const Product = require('../model/Product');
const productRepository = require('../model/ProductRepository')
exports.createProduct = async (req, res) => {
    try {
        let payload = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }
        let product = await productRepository.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const id = req.body.id;
        let objForUpdate = {};

        if (req.body.title) objForUpdate.title = req.body.title;
        if (req.body.price) objForUpdate.price = req.body.price;
        if (req.body.description) objForUpdate.description = req.body.description;
        if (req.body.image) objForUpdate.image = req.body.image;

        objForUpdate = { $set: objForUpdate }
        let doc = await Product.findOneAndUpdate({ _id: id }, objForUpdate, {
            new: true
        });
        res.status(200).json({
            status: true,
            data: doc,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}