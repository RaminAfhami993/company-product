const express = require("express");
const Router = express.Router();
const Company = require('../models/company');
const Product = require('../models/product');



Router.get('/companiesPage', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.render('company', {companies})
    });
});

Router.get('/all', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(companies);
    });
});

Router.get('/:id', (req, res) => {
    Company.findOne({_id: req.params.id}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        Product.find({company: company._id}, (err, products) => {
            if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});

            res.render('companyInfo', {company, products})

        })
    })

    // Company.findOne({_id: req.params.id}, (err, company) => {
    //     if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
    //     Factor.find({company: company._id}, {company: 0}).populate('product', {__v: 0}).exec((err, factors) => {
    //         if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});

    //         return res.json(factors)
    //     })
      
    // })
    

});

Router.put('/', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({msg: "Bad Request :)"})
    };

    Company.findOne({name: req.body.name.trim()}, (err, existCompany) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        if (existCompany) return res.status(406).json({msg: "Exist Company Name :("})
    
        const newCompany = new Company({
            name: req.body.name,
            employees: req.body.employees
        });
    
        newCompany.save((err, company) => {
            if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
            res.json(company);
        })
    })
});

Router.post('/:id', (req, res) => {
    Company.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(company);
    })


});

Router.delete('/:id', (req, res) => {
    Company.findOne({_id: req.params.id}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        if (!company) return res.status(404).json({msg: "Not Found!"})
        company.deleteOne((err, company) => {
            if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        
            Product.deleteMany({company: company._id}, err => {
                if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});

                Company.find({}, (err, companies) => {
                    if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
                    res.render('company', {companies})
                })
            })
        });
        
    })
});



module.exports = Router;