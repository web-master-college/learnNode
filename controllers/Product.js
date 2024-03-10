const Product = require('../models/product');
const sequelize = require('sequelize');
const getRandomRating = () =>{
        return Math.floor(Math.random() * 5);
}


const getProducts = (request , response) =>{

    Product.findAll()
            .then(products =>{
                const ratedProducts = products.map(p => {
                    p.rating = getRandomRating();
                    return p;
                })
                response.render('products/all', {products: ratedProducts});

            }).catch(err =>{
                response.render('404');   
            })


}

const singleProduct = async (request , response) =>{
    const id = request.params.productId;
    const product = await Product.findOne({where:{id: id}, raw: true});
    if(product){
        response.render('products/single', product);
    }else{
        response.render('404');
    }
    
}

module.exports ={
    singleProduct,
    getProducts
}