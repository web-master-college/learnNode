const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const hbs = require('hbs');
const productRouter = require('./routes/product');


const Users = [];

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'public')));

console.log(chalk.blueBright('Meshulami'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((request, response, next) =>{
    console.log(chalk.blueBright(`Requested URL: ${request.url}`));
    next();
})

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

app.get('/new-user', (request, response) => {
    
    const {firstName, userName, email, password} = request.query;
    console.log({firstName, userName, email, password})
    //const {firstName, userName, email, password} = request.body;
    Users.push({firstName, userName, email, password, id: Users.length + 1});
    response.redirect('/');
    // response.render('home', {
    //     title: 'HomePage All Users',
    //     users: Users
    // }); 
    console.log(Users);
});




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


app.listen(PORT, () =>{
    console.log(chalk.bgYellowBright(`Server is running on Port ${PORT}`));
});
