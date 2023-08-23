const client = require("./connection");

// constructor
const Activity = function (activity) {
};

Activity.create = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO activity SET ?",
        [data], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Activity.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT activity.id as id, activity_name.name as name, activity_name.point as point FROM activity JOIN activity_name on activity.activity_id=activity_name.id WHERE user_id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Activity Not Found"})
                return
            }
            resolve(rows[0]);
        });
    });
};

Activity.getPoint = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT sum(activity_name.point) as points FROM activity JOIN activity_name on activity.activity_id=activity_name.id WHERE user_id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Activity Not Found"})
                return
            }
            resolve(rows[0].points);
        });
    });
};

Activity.addName = (data) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO activity_name SET ?",
        [data], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Activity.deleteName = (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        client.query("DELETE FROM activity_name WHERE id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.affectedRows == 0 ) {
                reject({message: "Not Found"})
                return;
            }
            resolve(rows);
        });
    });
};

Activity.getAll = () => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM activity_name", (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Activity Not Found"})
                return
            }
            resolve(rows);
        });
    });
};

Activity.getName = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM activity_name WHERE id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Activity Not Found"})
                return
            }
            resolve(rows[0]);
        });
    });
};

module.exports = Activity;