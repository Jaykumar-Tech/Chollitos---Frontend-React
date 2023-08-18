const client = require("./connection");

// constructor
const Store = function (store) {
    this.html = store.html
};

Store.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO store SET ?",
        data, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Store.edit = (id, data) => {
    return new Promise((resolve, reject)=>{
        client.query("UPDATE store SET ? WHERE id=?",
        [data, id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Store.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM store WHERE id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "not found"})
                return
            }
            resolve(rows[0]);
        });
    });
};

Store.getAll = () => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM store", (err, rows) => {
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

module.exports = Store;