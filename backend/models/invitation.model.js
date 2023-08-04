const client = require("./connection");

// constructor
const Invitation = function (invitation) {
    this.sender = invitation.sender;
    this.receiver = invitation.receiver;
    this.status = invitation.status;
};

Invitation.request = (sender, receiver, result) => {
    client.query("SELECT * FROM invitation WHERE sender=? AND receiver=?",
        [sender, receiver],
        (err, rows) => {
            if (err || rows.length == 0) {
                client.query("INSERT INTO invitation SET sender=?, receiver=?, status='pending'",
                    [sender, receiver], (err, row) => {
                        if (err) {
                            result(err, null);
                            return;
                        }
                        result(null, { data: row });
                    });
            } else {
                result({ exist: "Already Request Exist" }, null)
            }
        })
};

Invitation.accept = (sender, receiver, result) => {
    client.query("UPDATE invitation SET status='accept' WHERE sender=? AND receiver=?",
        [sender, receiver], (err, row) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: row });
        });
};

Invitation.reject = (sender, receiver, result) => {
    client.query("DELETE from invitation WHERE sender=? AND receiver=?",
        [sender, receiver], (err, row) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: row });
        });
};

Invitation.getInvitationsForSender = (sender, result) => {
    client.query("SELECT * FROM invitation WHERE sender=?",
        sender, (err, rows) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: rows });
        });
};

Invitation.getInvitationsForReceiver = (receiver, result) => {
    client.query("SELECT * FROM invitation WHERE receiver=?",
        receiver, (err, rows) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { data: rows });
        });
};

Invitation.getAll = (result) => {
    client.query("SELECT * FROM invitation", (err, rows) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { data: rows });
    });
};

module.exports = Invitation;