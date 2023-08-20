const client = require("./connection");

// constructor
const Blog = function (blog) {
    this.html = blog.html
};

Blog.create = (html) => {
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO blog SET html=?",
        [html], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Blog.edit = (id, html) => {
    return new Promise((resolve, reject)=>{
        client.query("UPDATE blog SET html=? WHERE id=?",
        [html, id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    })
};

Blog.get = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM blog WHERE id=?", [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            } 
            if ( rows.length == 0 ) {
                reject({message: "Blog Not Found"})
                return
            }
            resolve(rows[0]);
        });
    });
};

module.exports = Blog;