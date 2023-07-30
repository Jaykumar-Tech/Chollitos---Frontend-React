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
User.getAll = ( result) => {
    let query = "SELECT * FROM users";
    // if (name) {
    //     query += " WHERE name LIKE '%${name}%'";
    // }
    client.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.updateById = (id, user, result) => {
    client.query(
        "UPDATE users SET name = ?, password = ?, email = ?, role = ?, status = ? WHERE id = ?",
        [user.name, user.password, user.email, user.role, user.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
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
            result(null, err);
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
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};
module.exports = User;