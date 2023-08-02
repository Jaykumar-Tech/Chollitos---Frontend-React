const client = require("./connection");
// constructor
const User = function (user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.status = user.status;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
};
User.create = (newUser, result) => {
    client.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};
User.findById = (id, result) => {
    client.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};
User.findByEmail = (email, result) => {
    client.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};
User.getAll = (result) => {
    let query = "SELECT * FROM users";
    // if (name) {
    //     query += " WHERE name LIKE '%${name}%'";
    // }
    client.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.updateById = (id, user, result) => {
    client.query(
        "UPDATE users SET firstname = ?, lastname = ?, password = ?, email = ?, role = ?, status = ? WHERE id = ?",
        [user.firstname, user.lastname, user.password, user.email, user.role, user.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};
User.remove = (id, result) => {
    client.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};
User.removeAll = result => {
    client.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};
User.addReview = (email, star, result) => {
    client.query("SELECT * FROM users WHERE email=?", email, 
    (err, users) => {
        if (err) {
            result(err, null);
            return ;
        }
        if ( users.length == 0 ) {
            result({kind: "not found"}, null) ;
            return ;
        }
        var review = JSON.parse(users[0].review);
        review[star - 1] = review[star - 1] + 1;
        client.query("UPDATE users SET review = ? WHERE email = ? ",
            [JSON.stringify(review), email], (err, user) => {
                if (err) {
                    result(err, null);
                    return ;
                }
                result(null, { id: users[0].id });
                return ;
            })
    })
}
User.incBalance = (email, value, result) => {
    client.query("SELECT * FROM users WHERE email=?", email, 
    (err, users) => {
        if (err) {
            result(err, null);
            return ;
        }
        if ( users.length == 0 ) {
            result({kind: "not found"}, null) ;
            return ;
        }
        var balance = users[0].balance + value;
        client.query("UPDATE users SET balance = ? WHERE email = ? ",
            [balance, email], (err, user) => {
                if (err) {
                    result(err, null);
                    return ;
                }
                result(null, { id: users[0].id });
                return ;
            })
    })
}
User.decBalance = (email, value, result) => {
    client.query("SELECT * FROM users WHERE email=?", email, 
    (err, users) => {
        if (err) {
            result(err, null);
            return ;
        }
        if ( users.length == 0 ) {
            result({kind: "not found"}, null) ;
            return ;
        }
        if ( users[0].balance < value ) {
            result({balance: "not enough balance"}, null) ;
            return ;
        }
        var balance = users[0].balance - value;
        client.query("UPDATE users SET balance = ? WHERE email = ? ",
            [balance, email], (err, user) => {
                if (err) {
                    result(err, null);
                    return ;
                }
                result(null, { id: users[0].id });
                return ;
            })
    })
}
module.exports = User;