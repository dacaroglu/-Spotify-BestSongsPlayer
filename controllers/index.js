const User = require('../models/User')
const Song = require('../models/Song')
const request= require('request')
const fetch= require('node-fetch')
const song = require('../models/Song')

module.exports={
    index,
    about
}
function index(req,res,next){
    User.find({})
    .populate("song")
    .exec(function (err, user)
    {
      Song.find({}).exec(function (err, songs)
      {
        res.render("index", 
        {
          song: songs,
          user: req.user,
        });
      });
    });
}
function about(req,res,next){
    res.render('about',{
        'user':req.user
    })
}