import { productDb } from "../models/productModel.js";
export default class ProductController {
    // URL =  api/products
    //ALLA PRODUKTER
    getAll = async (req, res, next) => {
        res.status(200).json({
            success: true,
            message: 'Products found.',
            status: 200,
            products: req.products
        });
    }
    
    // ENSKILD PRODUKT PÅ ID
    // URL =  api/products/:productId
    get = async (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Product found.',
            status: 200,
            product: req.product
        });       
    }

    add = async (req, res) => {
        req.product.createdAt = new Date();
        const addedProduct = await productDb.insert(req.product);
        
        res.status(200).json({
            success: true,
            message: 'Product successfully added.',
            status: 200,
            addedProduct: addedProduct
        });       
    }
    
    remove = async (req, res) => {
        await productDb.removeOne({_id: req.product._id});
        res.status(200).json({
            success: true,
            message: 'Product successfully removed.',
            status: 200,
            removedProduct: req.product
        });       
    }
    update = async (req, res) => {
        const {oldProduct, newProduct} = req;
        newProduct.modifiedAt = new Date();
        
        await productDb.update({_id: oldProduct._id}, {$set: newProduct}, {upsert:true})

        const data = await productDb.findOne({_id: oldProduct._id});

        res.status(200).json({
            success: true,
            message: 'Product successfully updated.',
            status: 200,
            updatedProduct: data
        });       
    }
}

