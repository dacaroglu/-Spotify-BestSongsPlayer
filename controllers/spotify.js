const User = require("../models/User");
const Song = require("../models/Song");
const request = require("request");
const fetch = require("node-fetch");
const bcrypt = require('bcrypt')
module.exports = {
  index,
  account,
  update,
  vote,
  delete: deleteOne,
  create
};

async function index(req, res, next) {
  /* -------------------Song Fetch-------------------- */
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + req.user.accesstoken,
    },
  };
  let response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=5",
    options
  );
  let results = await response.json();
  let ress = [];
  let songs = results.items.map((item) => {
    let date = new Date(item.duration_ms);
    let seconds =
      date.getSeconds() < 10
        ? "0" + date.getSeconds().toString()
        : date.getSeconds().toString();

    let dur = "0" + date.getMinutes().toString() + ":" + seconds;
    ress = {
      songId: item.id,
      name: item.name,
      album: item.album.name,
      artist: item.artists[0].name,
      url: item.href,
      duration: dur,
    };
    return ress;
  });

  /* -------------------Song Database Check and Save-------------------- */
  let listToAdd = [];
  let final = [];

  for await (const song of songs) {
    let songRes = await Song.find({ songId: song.songId });
    let tempSong = [];
    if (songRes.length > 0) {
      if (!req.user.song.includes(songRes[0])) {
        tempSong.push(songRes[0]._id);
      }
    } else {
      let createdSongs = await Song.create(song);
      tempSong.push(createdSongs._id);
    }
    listToAdd.push(tempSong);
  }
  req.user.song = listToAdd;
  req.user.save();

  User.find({})
    .populate("song")
    .exec(function (err, user) {
      Song.find({}).exec(function (err, songs) {
        res.render("spotify/index", {
          user: req.user._id,
          name: req,
          song: songs,
        });
      });
    });
}
function account(req, res, next) {
  User.findById(req.user._id)
    .populate("song")
    .exec(function (err, user) {
      Song.find({ _id: { $in: user.song } }).exec(function (err, songs) {
        res.render("spotify/account", {
          user: req.user,
          song: songs,
        });
      });
    });
}
function update(req, res) {
  let desc = req.body.description;
  req.user.description = desc;
  req.user.save();
  res.redirect("./account#profile");
}
function deleteOne(req, res) {
  Song.find({ songId: req.params.id }, function (err, result) {
    let deleteId = result[0]._id;
    let tempSong = req.user.song;
    let idRemove = tempSong.indexOf(deleteId);
    tempSong.splice(idRemove, 1);
    req.user.song = tempSong;
    req.user.save();
  });
  res.redirect("/spotify/account#song");
}
function vote(req, res) {/*FIXME: IMPLEMENT VOTE REMOVE IF THERE IS ALREADY ONE*/
  Song.find({ songId: req.params.songId }, async function (err, result) {
    if (result[0].votes.includes(req.user._id)) {
      //   result[0].votes.find
      //   result.votes = [newVotes]
      //   result.save()
      // findOneAndRemove(,function(err,left){})
    }

    await Song.findOneAndUpdate(
      { songId: req.params.songId },
      { votes: req.user._id }
    );
  });

  res.redirect("../");
}

function create(req,res){
  User.findOne({email:req.body.email},async (err,user)=>{
    if(user){ return res.redirect('../')}
    req.body.password = await bcrypt.hash(req.body.password,parseInt(process.env.SALT_ROUNDS))
    await User.create(req.body,(err,user)=>{
      if(err){console.log(err,'this error happened')}
      res.redirect('../')
    })
  })
  
}