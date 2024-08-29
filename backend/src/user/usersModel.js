var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({

    firstname:{
        type:String,
        //required:true
    },
    middlename:{
        type:String,
        //required:true
    }, 
    lastname:{
        type:String,
        //required:true
    },
    email:{
        type:String,
       // required:true
    },
    gender:{
        type:String,
        // required:true
    },
    phone: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        enum: ['warden', 'admin'],
        default: 'warden',
      }
  
});

module.exports = mongoose.model('users', usersSchema);