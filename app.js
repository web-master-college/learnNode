const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const hbs = require('hbs');
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const db = require('./utils/database');
// const Product = require('./models/product');
// const ProductImage = require('./models/productimages');

const Users = [];

hbs.registerHelper("getProductImage", function(product, options) {
    if(product.ProductImages && product.ProductImages.length){
        return `<img src="${product.ProductImages[0].url}" alt="${product.name}" />`
    }
    return '';

});


app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

console.log(chalk.blueBright('Meshulami'));
hbs.registerPartials(__dirname + '/views/partials');

// START  ---> / --> middleware (console.log) --> get (path /) --> return resposnse --> END

// app.use((request, response, next) =>{
//     console.log(chalk.blueBright(`Requested URL: ${request.url}`));
//     next();
// })

app.use(authRouter);
app.use('/products', productRouter);

app.get('/', (req, response) => {
    response.render('home', {
        title: 'HomePage All Users',
        users: Users
    });
});

app.get('/register', (req, response) => {
    response.render('register');
});

// new data sent to user
//  product/10

///   user/333   /user/2345
app.get('/user/:userId', (request, response) => {

        const userId = parseInt(request.params.userId);
        const userIndex = Users.findIndex(user => user.id === userId);
        if(userIndex > -1){
            const {firstName, userName, email} = Users[userIndex];
            response.render('singleUser', {
                firstName, userName, email
            })
        }else{
            response.render('404');
        }
        

})
// URL -> 
// HEDARES
// BODY
// url encode -> url decode

app.post('/new-user', (request, response) => {
    
    const {firstName, userName, email, password} = request.body;
    console.log({firstName, userName, email, password});
    //const {firstName, userName, email, password} = request.body;
    Users.push({firstName, userName, email, password, id: Users.length + 1});
    response.redirect('/');
});

// products/234

// -> name, price, id, descripion



app.get('/users', (req, res) => {
    console.log(chalk.blueBright('Users page'));
    res.render('users', { title: 'Users'});
})

app.get('/about', (req, res) => {
    console.log(chalk.blueBright('About page'));
    res.render('about', { title: 'About'});
})

app.use((req , res, next) =>{
    res.render('404');
})


app.listen(PORT, async () =>{
        try{
            
            // await Product.sync();

            await db.authenticate();
            console.log(chalk.bgYellowBright(`Server is running on Port ${PORT}, Succssfully connected to Databsae`));
        }catch(e){
            console.log(chalk.bgRedBright(`Server is running on Port ${PORT}, Could not connected to Databsae`));
        }
});

// db.sync()
//     .then(() =>{
//         console.log(chalk.bgYellowBright(`Models Succssfully created.`));
//     });
