// contactController.js

// Import contact model
Contact = require('../Models/contactModel');

// Handle index actions
exports.landing = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact({
        name:req.body.name ? req.body.name : contact.name,
        gender:req.body.gender,
        email:req.body.email,
        phone:req.body.phone,
    });
    
    // save the contact and check for errors
    contact.save().then(result=>{
        console.log(result);
        res.status(210).json({
            message:"successfully submitted the data",
            data:result
        })
    }).catch(err=>{
        console.log(err);
    })
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id)
    .exec()
    .then(fetch=>{
        if(!fetch){
            res.status(404).json({
                message:"No contact found!!!!"
            })
        }else{
        res.status(201).json({
            message:"Contact Found",
            contact:fetch
        })
    }
  })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
};
// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id).then(contact=>{
        console.log(contact);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.save().then(result=>{
            res.json({
                message:"Info Updated",
                data:result
            })
        })
    }).catch(err=>{
       res.json({
        message: "Error Occured!!!",
        error: err
       })
    })
};

exports.delete = function (req,res) {
    Contact.remove({_id:req.params.contact_id})
            .exec()
            .then(result=>{
                res.status(201).json({
                    message:"Contact Removed!!!",
                    contact:result
                });
            })
            .catch(err=>{
                res.status(500).json({
                    message:"error has occured",
                    error:err
                })
            })
}