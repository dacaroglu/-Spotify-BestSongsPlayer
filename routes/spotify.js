var express = require('express');
var router = express.Router();
var passport = require('passport')
var spotifyCtrl = require('../controllers/spotify')

/* GET users listing. */
router.get('/', ensureAuthenticated,spotifyCtrl.index);
router.get('/account',ensureAuthenticated, spotifyCtrl.account)
router.get('/account/delete/:id',ensureAuthenticated,spotifyCtrl.delete)
router.post('/account',ensureAuthenticated, spotifyCtrl.update)
router.get('/vote/:songId', ensureAuthenticated,spotifyCtrl.vote)
function ensureAuthenticated(req,res,next)
  {console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }
module.exports = router;
