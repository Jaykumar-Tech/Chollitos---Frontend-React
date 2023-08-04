const client = require("./connection");
const cacheUtil = require('../utils/cache.util');
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
            result(err, null);
            return;
        } else {
            result(null, { id: res.insertId, ...newUser });
        }
    });
};
User.findById = (id, result) => {
    client.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else if (res.length) {
            result(null, res[0]);
            return;
        } else
            result({ kind: "not_found" }, null);
    });
};
User.findByEmail = (email, result) => {
    client.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else if (res.length) {
            result(null, res[0]);
            return;
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};
User.getAll = (result) => {
    let query = "SELECT * FROM users";
    client.query(query, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};
User.updateById = (id, user, result) => {
    client.query(
        "UPDATE users SET firstname = ?, lastname = ?, password = ?, email = ?, role = ?, status = ? WHERE id = ?",
        [user.firstname, user.lastname, user.password, user.email, user.role, user.status, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            } else {
                result(null, { id: id, ...user });
            }
        }
    );
};
User.remove = (id, result) => {
    client.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        } else {
            result(null, res);
        }
    });
};
User.removeAll = result => {
    client.query("DELETE FROM users", (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};
User.addReview = (email, star, result) => {
    client.query("SELECT * FROM users WHERE email=?", email,
        (err, users) => {
            if (err) {
                result(err, null);
                return;
            } else if (users.length == 0) {
                result({ kind: "not found" }, null);
                return;
            } else {
                var review = JSON.parse(users[0].review);
                review[star - 1] = review[star - 1] + 1;
                client.query("UPDATE users SET review = ? WHERE email = ? ",
                    [JSON.stringify(review), email], (err, user) => {
                        if (err) {
                            result(err, null);
                            return;
                        } else {
                            result(null, { id: users[0].id });
                            return;
                        }
                    })
            }
        })
}
User.incBalance = (email, value, result) => {
    client.query("SELECT * FROM users WHERE email=?", email,
        (err, users) => {
            if (err) {
                result(err, null);
                return;
            } else if (users.length == 0) {
                result({ kind: "not found" }, null);
                return;
            } else {
                var balance = users[0].balance + value;
                client.query("UPDATE users SET balance = ? WHERE email = ? ",
                    [balance, email], (err, user) => {
                        if (err) {
                            result(err, null);
                            return;
                        } else {
                            result(null, { id: users[0].id });
                            return;
                        }
                    })
            }
        })
}
User.decBalance = (email, value, result) => {
    client.query("SELECT * FROM users WHERE email=?", email,
        (err, users) => {
            if (err) {
                result(err, null);
                return;
            } else if (users.length == 0) {
                result({ kind: "not found" }, null);
                return;
            } else if (users[0].balance < value) {
                result({ balance: "not enough balance" }, null);
                return;
            } else {
                var balance = users[0].balance - value;
                client.query("UPDATE users SET balance = ? WHERE email = ? ",
                    [balance, email], (err, user) => {
                        if (err) {
                            result(err, null);
                            return;
                        } else {
                            result(null, { id: users[0].id });
                            return;
                        }
                    })
            }
        })
}
User.saveCode = (email, code, result) => {
    client.query("UPDATE users SET code = ? WHERE email = ? ",
        [code, email], (err, user) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, { data: user });
                return;
            }
        })
}
User.verifyCode = (email, code, result) => {
    client.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else if (res.length) {
            var user = res[0];
            if (user.code != code) {
                result({ message: "not match" }, null)
                return;
            }
            else {
                client.query("UPDATE users SET status=1 WHERE email=?",
                    email,
                    (err, response) => {
                        if (err) {
                            result(err, null);
                            return;
                        } else {
                            result(null, { data: response })
                            return;
                        }
                    })
            }
        } else {
            // not found User with the id
            result({ kind: "not_found" }, null);
        }
    });
}
User.resetPassword = (email, password, result) => {
    client.query("UPDATE users SET password=? WHERE email=?",
    [password, email], (err, row) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, { data: row })
            return;
        }
    })
}
User.logoutUser = (token, exp) => {
    const now = new Date();
    const expire = new Date(exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    return cacheUtil.set(token, token, milliseconds);
}
module.exports = User;