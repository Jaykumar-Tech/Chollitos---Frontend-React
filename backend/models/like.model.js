const client = require("./connection");

// constructor
const Like = function (likes) {
};

Like.find = (data) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM likes WHERE user_id=? AND dest_id =? AND type=?",
            [data.user_id, data.dest_id, data.type],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (rows.length > 0) {
                    resolve({message: "Already Exist"});
                    return;
                }
                reject({
                    message: "No Exist"
                })
            })
    })
}

Like.create = (data) => {
    return new Promise((resolve, reject) => {
        Like.find(data)
        .then(response=>{
            console.log(response)
            reject(response)
        })
        .catch(err=>{
            console.log(err)
            client.query("INSERT INTO likes SET ?",
            data, (err2, row) => {
                if (err2) {
                    console.log("erorr2")
                    reject(err);
                    return;
                }
                resolve(row);
            });
        })

                
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
                if (rows.length == 0) {
                    reject({ message: "not found" })
                    return
                }
                resolve(rows);
            });
    });
};

module.exports = Like;