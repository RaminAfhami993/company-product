const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    CreationDate: {
        type: Date
    },  
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true  
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
