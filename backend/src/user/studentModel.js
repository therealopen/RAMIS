 var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({

    firstname:{
        type:String,
        
    },
    middlename:{
        type:String,
        
    }, 
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    gender:{
        type:String,
        
    },
    block:{
        type:String,
        
    },
    floor:{
        type:String,
        
    },
    room:{
        type:String,
        
    },
    wing: {
        type: String,
        
    },
    phone: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    role: {
        type: String,
        enum: ['warden', 'student'],
        default: 'student'
      }
  
});

module.exports = mongoose.model('student', studentSchema);