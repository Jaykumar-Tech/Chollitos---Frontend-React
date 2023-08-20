const client = require("./connection");

// constructor
const Deal = function (deal) {
};

Deal.create = (data) => {
    data.status = 1;
    data.uploaded_date = new Date();
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO deal SET ?",
        [data], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Deal.edit = (id, data) => {
    return new Promise((resolve, reject) => {
        client.query("UPDATE deal SET ? WHERE id=?", 
        [data, id], (err, rows) => {
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

Deal.find = (data) => {
    var start_at = data.start_at ;
    var length = data.length ;
    var filter = [] ;
    if ( data.free ) filter.push( "type='free'")
    if ( data.store_id != -1 ) filter.push(`store_id=${data.store_id}`);
    if ( data.category_id != -1 ) filter.push(`category_id=${data.category_id}`);
    if ( filter.length > 0 ) filter = filter.join(" AND ") ;
    else filter = "1=1";
    return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM deal WHERE ${filter} ORDER BY uploaded_date LIMIT ? OFFSET ?;`,
        [length, start_at],
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
}

Deal.count = (data) => {
    var filter = [] ;
    if ( data.free ) filter.push( "type='free'")
    if ( data.store_id != -1 ) filter.push(`store_id=${data.store_id}`);
    if ( data.category_id != -1 ) filter.push(`category_id=${data.category_id}`);
    if ( filter.length > 0 ) filter = filter.join(" AND ") ;
    else filter = "1=1";
    return new Promise((resolve, reject) => {
        client.query(`SELECT count(*) as cnt FROM deal WHERE ${filter}`,
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

Deal.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM deal WHERE id=?",
        [id],
         (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Deal Not Found"})
                return
            }
            resolve(rows);
        });
    });
};

module.exports = Deal;