const client = require("./connection");

// constructor
const Comment = function () {
};

Comment.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO comment SET ?",
        [data], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Comment.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM comment WHERE id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Comment Not Found"})
                return
            }
            resolve(rows[0]);
        });
    });
};

Comment.find = (data) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM comment WHERE type=? AND dest_id=?", 
        [data.type, data.dest_id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Comment Not Found"})
                return
            }
            resolve(rows);
        });
    });
};

module.exports = Comment;