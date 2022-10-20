var express = require('express');
const passport = require('passport');
const app = require('../server');
var router = express.Router();
require('../config/spotifyPassport');
const spotifyCtrl= require('../controllers/spotify')
const indexCtrl = require('../controllers/index')



/* GET home page. */
router.get('/',indexCtrl.index) ;
router.get('/about',indexCtrl.about)
router.get('/like/:songId', spotifyCtrl.vote)
router.post('/signup', spotifyCtrl.create)
router.post('/login',passport.authenticate('local',{
  successRedirect:'./',
  failureRedirect:'./about'
}))
router.get('/spotifyLogin', function(req,res){
  res.redirect('/auth/spotify')
})
router.get('/auth/spotify',
passport.authenticate('spotify',{
  scope: [
    'user-read-email',
    'user-read-private',
    'user-top-read',
  ],
  showDialog:true
})
)
router.get('/auth/spotify/callback',
  passport.authenticate('spotify',{failureRedirect:'/login'}),
  function(req,res){
    console.log(req.user)
    res.redirect('/spotify')
  })
  router.get('/logout',function(req,res){
    req.logout(function(err){
      res.redirect('/')
    })
    
  })

function ensureAuthenticated(req,res,next)
{
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}
module.exports = router;
