const User = require("../models/user.model");

// create and save new user
exports.create = (req, res) => {

    // validate request
    if (!req.body) {
        res.status(400).send({
            message: "Bad Request"
        })
    }

    // create user        
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone
    });

    // save to database
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal Server Error"
            })
        } else {
            console.log(data);
            res.send(data);

        }

    })
};

//find user by id
exports.findById = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured at get user by id" });
        } else {
            res.send(data);
        }
    })
}

// get all users
exports.getAll = (req, res) => {
    // find users
    User.findAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occured at get all users" });
        } else {
            res.send(data);
        }
    });

};

exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if(err) {
            if(err.notFound === "not_found") {
                res.status(404).send({message: err.message || `No user found with this id (${req.params.id})`});
            } else {
                res.status(500).send({message: err.message || "Could not remove user with id " + req.params.id});
            }
        } else {
            res.send({message: `User (id ${req.params.id}) removed`});
        }
    });
}