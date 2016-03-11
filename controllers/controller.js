var User = require('../models/user.js');
var Blog = require('../models/blog.js')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var Photo = require('../models/image.js')
var Customer = require('../models/customer.js')
var sendgrid = require('sendgrid')(accessKey)
function userSignup (req, res){
	console.log('controller signup', req.body.username, req.body.password)
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            console.log(newUser)
            newUser.save(function(saveErr, user){
                console.log('were in the save')
                if ( saveErr ) { 
                    console.log('if save error', saveErr)
                    res.send({ err:saveErr }) 
                }
                else { console.log('got to else statement')
                    req.login(user, function(loginErr){
                        if ( loginErr ) { 
                            console.log('login error'. loginErr)
                            res.send({ err:loginErr }) 
                        }
                        else { 
                            console.log('second success')
                            res.send({success: true}) 
                        }
                    })                   
                }
            })

        })
    })
}
function userLogin (req, res, next){
	passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.log('auth error', err)
            return next(err); 
        }
        if (!user) { 
            console.log('no registered user')
            return res.send({error : 'something went wrong :('}); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                console.log('login error', err)
                return next(err); 
            }
            console.log('no nog in error should be fine')
            return res.send({success: true})
        });
    })(req, res, next);
}
function newBlog (req, res){
    var entry = new Blog({
        headline : req.body.headline.toString(), 
        date : req.body.date, 
        content : req.body.content.toString(),  
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
function getBlog (req, res){
    Blog.find({}, function(err, array){
        if(err){
            console.log('blog find error', err)
            res.send({err: err})
        }
        else {
            console.log("blog results", array)
            res.json(array)
        }
    })
}
function getImage (req, res){
    Photo.find({}, function(err, array){
        if(err){
            console.log('image find error', err)
            res.send({err: err})
        }
        else{
            console.log("image results", array)
            res.json(array)
        }
    })
}
function imgRemove (req, res){
    Photo.remove({_id: req.body._id}, function(err, photo){
        if(err){
            console.log("img remove error", err)
            res.send({err: err})
        }
        else{
            console.log('image being removed', photo)
            res.json(photo)
        }
    })
}
function blogRemove (req, res){
    Blog.remove({_id: req.body._id}, function(err, blog){
        if(err){
            console.log("blog remove error", err)
            res.send({err: err})
        }
        else{
            console.log('blog being removed', blog)
            res.json(blog)
        }
    })
}
function newCustomer (req, res){
    console.log(req.body)
    var person = new Customer({
        name: req.body.name, 
        email: req.body.email, 
        number: req.body.number, 
        query: req.body.query
    })
    person.save(function(err, client){
        if(err){
            console.log('save error', err)
            res.send({err: err})
        }
        else{
            console.log('start of else',client)
            sendgrid.send({
                to: 'seanpbaillargeon@gmail.com',
                from: client.email,
                subject: 'New Information Request',
                text: client.query + ' from: ' + client.name + ' phone number:' + client.number
            }, function(err, json){
                if(err){
                    return console.log('sendgrid error',err)
                }
                console.log('sendgrid success object', json)
            })
           
            res.json(client)
        }
    })
}
module.exports = {
	userSignup : userSignup,
	userLogin : userLogin, 
    newBlog : newBlog,
    getBlog : getBlog,
    getImage : getImage,
    blogRemove : blogRemove,
    imgRemove : imgRemove,
    newCustomer : newCustomer,
}