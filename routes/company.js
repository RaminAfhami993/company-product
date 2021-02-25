const express = require("express");
const router = express.Router();
const Company = require('../models/company');


router.get('/companiesPage', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.render('company', {companies})
    });
});

router.get('/all', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(companies);
    });
});

router.get('/:id', (req, res) => {
    Company.findOne({_id: req.params.id}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(company);
    })
});

router.put('/', (req, res) => {
    
    
    const newCompany = new Company({
        name: req.body.name,
        employees: req.body.employees
    });

    newCompany.save((err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(company);
    })
});

router.post('/:id', (req, res) => {
    Company.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json(company);
    })
});

router.delete('/:id', (req, res) => {
    Company.findOneAndDelete({_id: req.params.id}, (err, company) => {
        if (err) return res.status(500).json({msg: "Server Error :)", err: err.message});
        res.json({company, msg: "success"});
    })
});



module.exports = router;