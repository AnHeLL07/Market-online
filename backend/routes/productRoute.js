import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/", async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) =>{
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message:"Produsul nu a fost găsit"})
    }
});

router.post("/", async(req, res) =>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        raiting: req.body.raiting,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if(newProduct){
        res.status(201).send({message: 'Un nou produs a fost adăugat', data: newProduct});
    }
    return res.status(500).send({message: 'Eroare la crearea produsului.'}); 
})

router.put("/:id", async(req, res) =>{
    const productId = req.params.id;
    const product = await Product.findById({_id: productId});
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if(updatedProduct){
            res.status(200).send({message: 'Produsul a fost actualizat cu succes', data: updatedProduct});
    }
}
    return res.status(500).send({message: 'Eroare la actualizarea produsului.'}); 
})

router.delete("/:id", isAuth, isAdmin, async(req, res) =>
    {
        const deletedProduct = await Product.findById(req.params.id);
        if(deletedProduct){
            await deletedProduct.remove();
            res.send({message:"Produsul a fost șters"});
        } else {
            res.send("Eroare la ștergere.");
        }   
    });

export default router;