
const getProductImage = function(product) {
    if(product.ProductImages && product.ProductImages.length){
        return `<img src="${product.ProductImages[0].url}" alt="${product.name}" />`
    }
    return '';

};

module.exports = {
    getProductImage
};