const Product = require('../models/product');


const getProducts = (request , response) =>{
    response.render('products/all', { title: 'Products'});
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