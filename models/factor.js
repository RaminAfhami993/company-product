const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactorSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true 
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

module.exports = mongoose.model('Factor', FactorSchema);
