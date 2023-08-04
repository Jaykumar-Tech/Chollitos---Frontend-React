const client = require("./connection");
// constructor
const Following = function (following) {
    this.sender = user.sender;
    this.receiver = user.receiver;
    this.status = user.status;
};

Following.request = (sender, receiver, result) => {
    client.query("SELECT * FROM following WHERE sender=? AND receiver=?",
        [sender, receiver],
        (err, rows) => {
            if (err || rows.length == 0) {
                client.query("INSERT INTO following SET sender=?, receiver=?, status='pending'",
                    [sender, receiver], (err, row) => {
                        if (err) {
                            result(err, null);
                            return;
                        }
                        result(null, { data: row });
                    })
            } else {
                result({ exist: "Already Request Exist" }, null)
            }
        }
    )
}
Following.accept = (sender, receiver, result) => {
    client.query("UPDATE following SET status='accept' WHERE sender=? AND receiver=?",
        [sender, receiver], (err, row) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: row });
        })
}
Following.reject = (sender, receiver, result) => {
    client.query("DELETE from following WHERE sender=? AND receiver=?",
        [sender, receiver], (err, row) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: row });
        })
}
Following.getFollowingForSender = (sender, result) => {
    client.query("SELECT * FROM following WHERE sender=?",
        sender, (err, rows) => {
            if (err) {
                result(err, null)
                return;
            }
            result(null, { data: rows })
        })
}
Following.getFollowingForReceiver = (receiver, result) => {
    client.query("SELECT * FROM following WHERE receiver=?",
        receiver, (err, rows) => {
            if (err) {
                result(err, null)
                return;
            }
            result(null, { data: rows })
        })
}
Following.getAll = (result) => {
    client.query("SELECT * FROM following", (err, rows) => {
        if (err) {
            result(err, null)
            return;
        }
        result(null, { data: rows })
    })
}

module.exports = Following;