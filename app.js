const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
        console.log(chalk.blueBright('HomePage'));
        res.send('HomePage');
        res.end();
})

app.get('/users', (req, res) => {
    console.log(chalk.blueBright('Users page'));
    res.send('Users page');
    res.end();
})

app.get('/about', (req, res) => {
    console.log(chalk.blueBright('About page'));
    res.send('About page');
    res.end();
})

app.listen(PORT, () =>{
    console.log(chalk.bgYellowBright(`Server is running on Port ${PORT}`));
});
