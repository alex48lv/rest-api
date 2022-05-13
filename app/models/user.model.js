const sql = require("./db.js");

// class User -> constructor
const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.login = user.login;
    this.password = user.password;
    this.address = user.address;
    this.phone = user.phone;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if(err) {
            console.log("Error: " + err);
            return;
        }
        
        console.log("created user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser})
    })
};

User.findOne = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("user found");
            result(null, res[0]);
            return;
        }
    });
};

User.findAll = result => {
    let query = "SELECT * FROM users";
    sql.query(query, (err, res) =>{
        if(err) {
            console.log("Error: " + err);
            result(null, err);
            return;
        }
        console.log("users: " + res);
        result(null, res);
    }); 

}

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if(err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            result({notFound: "not found"}, null);
            return;
        }

        console.log(`User (id ${id}) removed`);
        result(null, res);
    });
}

module.exports = User;