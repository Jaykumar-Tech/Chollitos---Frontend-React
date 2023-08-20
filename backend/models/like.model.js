const client = require("./connection");

// constructor
const Like = function (likes) {
};

Like.create = (data) => {
    console.log(data)
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO likes SET ?",
        data, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Like.get = (type, dest_id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM likes WHERE dest_id=? AND type=?",
         [dest_id, type], (err, rows) => {
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

module.exports = Like;