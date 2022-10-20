const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Icon= new Schema({
    name:String,
    url:String,
    })

const userSchema = new Schema({
    userID: String,
    userName: String,
    description:String,
    name: String,
    email: String,
    password:String,
    profileURL: String,
    profileImg: [Icon],
    premium:Boolean,
    accesstoken:String,
    song:[{type: Schema.Types.ObjectId, ref:'Song'},]    
    })

    module.exports = mongoose.model('User', userSchema)

   