const client = require("./connection");
const cacheUtil = require('../utils/cache.util');
// constructor
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.status = user.status;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
};
User.create = (newUser) => {
    return new Promise((resolve, reject) => {
        client.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve({ id: res.insertId, ...newUser });
            }
        });
    })
};
User.findById = (id) => {
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else if (res.length) {
                resolve(res[0]);
                return;
            } else
                reject({ message: "not_found" });
        });
    })
};
User.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM user WHERE email = ?", email, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else if (res.length) {
                resolve(res[0]);
                return;
            } else {
                reject({ message: "not_found" });
            }
        });
    })
};
User.getAll = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM user";
        client.query(query, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(res);
            }
        });
    })
};
User.updateById = (id, user) => {
    return new Promise((resolve, reject) => {
        client.query(
            "UPDATE user SET firstname = ?, lastname = ?, password = ?, email = ?, role = ?, status = ? WHERE id = ?",
            [user.firstname, user.lastname, user.password, user.email, user.role, user.status, id],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                } else if (res.affectedRows == 0) {
                    reject({ message: "not_found" });
                    return;
                } else {
                    resolve({ id: id, ...user });
                }
            }
        );
    })
};
User.remove = (id) => {
    return new Promise((resolve, reject) => {
        client.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else if (res.affectedRows == 0) {
                reject({ message: "not_found" });
                return;
            } else {
                resolve(res);
            }
        });
    })
};
User.removeByEmail = (email) => {
    return new Promise((resolve, reject) => {
        client.query("DELETE FROM user WHERE email = ?", email, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else if (res.affectedRows == 0) {
                reject({ message: "not_found" });
                return;
            } else {
                resolve(res);
            }
        });
    })
};
User.removeAll = () => {
    return new Promise((resolve, reject) => {
        client.query("DELETE FROM user", (err, res) => {
            if (err) {
                reject(err);
                return;
            } else {
                resolve(res);
            }
        });
    })
};
User.saveCode = (email, code) => {
    return new Promise((resolve, reject) => {
        client.query("UPDATE user SET code = ? WHERE email = ? ",
            [code, email], (err, user) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    resolve(user);
                    return;
                }
            })
    })
}
User.verifyCode = (email, code) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM user WHERE email = ?", email, (err, res) => {
            if (err) {
                reject(err);
                return;
            } else if (res.length) {
                var user = res[0];
                if (user.code != code) {
                    reject({ message: "not match" })
                    return;
                }
                else {
                    resolve("verified")
                }
            } else {
                // not found User with the id
                reject({ message: "not_found" });
            }
        });
    })
}
User.resetPassword = (email, password, result) => {
    return new Promise((resolve, reject) => {
        client.query("UPDATE user SET password=? WHERE email=?",
            [password, email], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    resolve(row)
                    return;
                }
            })
    })
}
User.logoutUser = (token, exp) => {
    return new Promise((resolve, reject) => {
        const now = new Date();
        const expire = new Date(exp * 1000);
        const milliseconds = expire.getTime() - now.getTime();
        /* ----------------------------- BlackList Token ---------------------------- */
        cacheUtil.set(token, token, milliseconds);
        resolve();
    })
}
module.exports = User;