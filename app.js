const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const hbs = require('hbs');

const Users = [];

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'public')));

console.log(chalk.blueBright('Meshulami'));
hbs.registerPartials(__dirname + '/views/partials');

app.use((request, response, next) =>{
    console.log(chalk.blueBright(`Requested URL: ${request.url}`));
    next();
})

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
app.post('/new-user', (request, response) => {
    const {firstName, userName, email, password} = request.body;
    Users.push({firstName, userName, email, password});
    response.render('home', {
        title: 'HomePage All Users',
        users: Users
    }); 
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
