const client = require("./connection");

// constructor
const Category = function (category) {
};

Category.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO category SET ?",
        data, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Category.getChildren = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM category WHERE parent_id=?", 
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

Category.getAll = () => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM category",
         (err, rows) => {
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

module.exports = Category;