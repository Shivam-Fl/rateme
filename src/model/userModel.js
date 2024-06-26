
const mongoose = require("mongoose")
const crypto = require('crypto')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true
    },
    password :{
        type: String,
         required: true
         },
    phoneNum:{
        type : Number,
        required: true
    },
    profilePhoto : {
        type: String,
        required: false
    },
    profilePhotoID : {
        type: String,
        required: false
    }
        
},
{ timestamps: true } 
)
userSchema.methods.generateVerificationToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.verifyToken = token;
    this.verifyTokenExpires = Date.now() + 3600000; // 1 hour
    return token;
  };
  
  userSchema.methods.generatePasswordResetToken = function() {
    const token = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    return token;
  };
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  
  module.exports = User;
  