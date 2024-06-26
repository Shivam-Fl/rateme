const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    rating: {
        type: Number,
        required: true
        },
    feedback:{
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campaign:{
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
    }
},
{
    timestamps:true
})

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);
  
module.exports = Rating;

