const client = require("./connection");

// constructor
const Review = function (review) {
    this.html = review.html
};

Review.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO review SET ?",
        data, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Review.get = (store_id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM review WHERE store_id=?", [store_id], (err, rows) => {
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

module.exports = Review;