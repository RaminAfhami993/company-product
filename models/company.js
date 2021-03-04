const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require('./product')

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        unique: true
    },
    employees: {
        type: Number,
        default: 1
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

CompanySchema.pre('save', function(next)  {
    console.log("this", this);

    return next();
    
});

CompanySchema.post('save', function(doc, next) {
    console.log("doc", doc);


    return next()
    
});


// CompanySchema.pre('deleteOne', {document:true}, function(next) {
//     console.log(this._id);

//     Product.deleteMany({company: this._id}, err => {
//         if (err) return next(err);
//         next();
//     })
// })

module.exports = mongoose.model('Company', CompanySchema);

