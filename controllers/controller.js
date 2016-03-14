var User = require('../models/user.js');
var Blog = require('../models/blog.js')
var bcrypt = require('bcryptjs')
var passport = require('passport')
var Photo = require('../models/image.js')
var Customer = require('../models/customer.js')
var sendgrid = require('sendgrid')('key')
var s3 = require('s3')
s3Client = s3.createClient({
    s3Options:{
        accessKeyId: 'key',
        secretAccessKey: 'key', 
    }
})
function imageLoad(req, res){
        console.log('imageload', req.files)
    var file = req.files.file.file
    console.log('image load two', file)
    var uploader = s3Client.uploadFile({
        localFile: file.path,
        s3Params:{
            Bucket:'bearcreeklandscape',
            Key: file.name,
            ACL : 'public-read',
            ContentType: file.type,
        }
    })
    uploader.on('progress', function(){
        console.log('progress', uploader.progressAmount, uploader.progressTotal)
    })
    uploader.on('end', function(){
        console.log('end', file.name)
        var imageUrl = s3.getPublicUrlHttp('bearcreeklandscape', file.name)
        var photo = new Photo({
            url: imageUrl
        })
        photo.save(function(err, image){
            res.send(image)
        })
    })
}
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
    console.log('newblog log', req.files)
    var body = req.body.data
    var file = req.files.data.file
    var uploader = s3Client.uploadFile({
        localFile: file.path, 
        s3Params: {
            Bucket: 'bearcreeklandscape',
            Key: file.name, 
            ACL : 'public-read'
        }
    })
    uploader.on('progress', function(){
        console.log('progress', uploader.progressAmount, uploader.progressTotal)
    })
    uploader.on('end', function(){
        var url = s3.getPublicUrlHttp('bearcreeklandscape', file.name)
        console.log('url loooggggging', url)
        var entry = new Blog({
            headline : body.headline.toString(), 
            date : body.date, 
            content : body.content.toString(),  
            image : url || null
        })
        console.log('presave entry',entry)
        entry.save(function(saveErr, entry){
            if(saveErr){ 
                console.log('save error', saveErr)
                res.send({err:saveErr})
            }
            else {
                console.log('success entry',entry)
                res.send(entry)
            }
        })
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
function getClient(req, res){
    Customer.find({}, function(err, array){
        if(err){
            console.log('client find error', err)
            res.send({err:err})
        }
        else{
            console.log('client results', array)
            res.json(array)
        }
    })
}
function imgRemove (req, res){
    console.log('image remove log', req.body)
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
                to: 'justinjnoska@gmail.com',
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
    getClient : getClient,
    blogRemove : blogRemove,
    imgRemove : imgRemove,
    newCustomer : newCustomer,
    imageLoad : imageLoad,
}