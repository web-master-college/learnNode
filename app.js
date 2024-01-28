const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const chalk = require('chalk');

app.get('/', (req, res) => {
        console.log(chalk.blueBright('HomePage'));
        res.send('HomePage');
})

app.get('/users', (req, res) => {
    console.log(chalk.blueBright('Users page'));
    res.send('Users page');
})

app.get('/about', (req, res) => {
    console.log(chalk.blueBright('About page'));
    res.send('About page');
})

app.listen(PORT, () =>{
    console.log(chalk.bgYellowBright(`Server is running on Port ${PORT}`));
});
