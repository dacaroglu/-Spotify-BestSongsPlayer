const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
const db = mongoose.connection
db.on('connected', function(){
    console.log(`connected to the spotify database at: ${db.host}:${db.port}`)
})