const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    ratedAs: {
        type: String,
        required: true
    },
    campaignLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creatorPhoto: String,
    ratings: [
      {
        rating: Number,
        comment: String
      }
    ]
}, {
    timestamps: true
});

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;