const chalk = require('chalk');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const logout = async (request , response) =>{
    await request.session.destroy();
    response.redirect('/login');
}   


const login = async (request , response) =>{
    
    if(request.method == "GET"){
        response.render('auth/login', {hideMenu: true});
    }else{
        const data = {};
        try{
            const {email, password} = request.body;

            if(email != '' && password != ''){
                const user = await User.findOne({
                    where:{email}
                })
            if(!user){
                throw new Error('User with this details not found!');
            }
            
            
            const isPassowrdValid = await bcrypt.compare(password, user.password);
    
            if(!isPassowrdValid){
                throw new Error('Password does not match!');
            }
            
              request.session.isLoggedIn = true;
              request.session.user = user;
              response.redirect('/products');

            }else{
                data['error'] = 'Please fill all fields';
                  
            }   

        }catch(error){
            data['error'] = error;
        }


        response.render('auth/login', {hideMenu: true, ...data});   

    }
    
    
}


const verifyLoginAccess = (request , response, next) =>{

        if(!request.session.isLoggedIn){
                response.redirect('/login');
        }else{
            next();
        }
        
}



const registerUser = async (request , response) =>{
    // User
    const saltRounds = 10;
    if(request.method === "GET"){
        response.render('register');
    }else{

        const {firstName, userName, email, password} = request.body;
        console.log({firstName, userName, email, password});
        const data = {};
        try{
            if(firstName != '' && userName !== '' && email != '' && password != ''){

                const hashedPassword = await bcrypt.hash(password, saltRounds);
                await User.create({
                    userName,
                    name: firstName,
                    email,
                    password: hashedPassword
                })

                data['success'] = 'User Created SuccessFully!';

            }else{
                data['error'] = 'Invalid params, please fill all fields';
            }
                
        }catch(error){

            data['error'] = error;
        }

        response.render('register', data);

    }

  
        
    //response.render('auth/login', {hideMenu: true});
}


module.exports ={
    login,
    registerUser,
    verifyLoginAccess,
    logout
}