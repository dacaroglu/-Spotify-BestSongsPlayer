const mongoose = require ('mongoose')
const User = require('./User')
const Schema = mongoose.Schema
const songSchema= new Schema({
    songId:{
        type:String,
        },
    name:String,
    album:String,
    artist:String,
    url:String,
    duration: String,
    votes: [{type: Schema.Types.ObjectId, ref:'User'},],
})
module.exports=mongoose.model('Song', songSchema)

