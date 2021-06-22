const User = require('../model/Auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {one} = require('../../until/index');



class   authController {
    index(req,res,next){
        
        res.render('home')
    }
    resgister(req,res,next){
        res.render('register')
    }
    loginToken(req,res,next){
        res.render('token')
    }
    veryfy(req,res,next){
        res.send('home')
    }
    cokie(req,res,next){
        const token = req.headers.authorization.trim().split("Bearer ")[1];
        const decodeJwt = jwt.verify(token, process.env.APP_KEY)
        console.log(decodeJwt)
        
    }
    async registed(req,res,next){
        
        
        try {
             const user = await User.create(req.body);   
             const token = jwt.sign({userId: user._id},process.env.APP_KEY);        
             res.render('registed',{
                 user : one(user)
             })
            
        } catch (error) {
            console.log(error)
        }
    }
    async  login(req, res, next) {
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                res.send('user not found')
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
             const token = jwt.sign({userId: user._id},process.env.APP_KEY);
             res.render('logined',{ user: one(user)})
             
            }else{
                res.send('password is correct')
                // Error : Password is not correct
            }
        } catch (error) {
           res.json(error)
        }
    }

    async  gettoken(req, res, next) {
        console.log(req.body)
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                res.send('user not found')
                // Error : Email not found
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
             const token = jwt.sign({userId: user._id},process.env.APP_KEY);
                res.json({
                    messenger : 'sucess',
                    data:{
                        token, userName : user.name
                    }
                })
                
                
            }else{
                res.send('Password is not correct')
                // Error : Password is not correct
            }
        } catch (error) {
           res.json(error)
        }
        
    }

}


module.exports = new authController;
