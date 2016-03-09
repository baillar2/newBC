var User = require('../models/user.js');
var bcrypt = require('bcryptjs')
var passport = require('passport')
var Blog = require('../models/blog.js')


function userSignup (req, res){
	console.log('controller signup', req.body.username, req.body.password)
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else { console.log('got to else statement')
                    req.login(user, function(loginErr){
                        if ( loginErr ) { 
                            res.send({ err:loginErr }) 
                        }
                        else { 
                            console.log('second success')
                            res.send({user:user}) 
                        }
                    })

                    // req.user is always the logged in user
                }
            })

        })
    })
}

function userLogin (req, res, next){
	passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.send({error : 'something went wrong :('}); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.send({user:user});
        });
    })(req, res, next);
}

function newBlog (req, res){
    var entry = new Blog({
        headline : req.body.headline, 
        date : req.body.date, 
        content : req.body.content,  
    })
    entry.save(function(saveErr, entry){
        if(saveErr){ 
            res.send({err:saveErr})
        }
        else {
            res.send(entry)
        }
    })
}




module.exports = {
	userSignup : userSignup,
	userLogin : userLogin, 
    newBlog : newBlog
}