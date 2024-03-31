
const login = async (request , response) =>{
    response.render('auth/login', {hideMenu: true});
}

module.exports ={
    login
}