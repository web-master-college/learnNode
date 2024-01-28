const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const hbs = require('hbs');


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'public')));

console.log(chalk.blueBright('Meshulami'));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
        console.log(chalk.blueBright('HomePage'));
        res.render('home', {
            title: 'HomePage'
        });
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
