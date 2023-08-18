const client = require("./connection");

// constructor
const Notification = function (notification) {
};

Notification.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO notification SET ?",
        data, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Notification.setRead = (id) => {
    return new Promise((resolve, reject) => {
        client.query("UPDATE notification SET is_read=1 WHERE id=?", 
        [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.changedRows < 1 ) {
                reject({message: "Not updated"})
                return;
            }
            resolve(rows);
        });
    });
};

Notification.getUnread = (user_id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM notification WHERE user_id=? AND is_read=0",
         [user_id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "not found"})
                return
            }
            resolve(rows);
        });
    });
};

module.exports = Notification;