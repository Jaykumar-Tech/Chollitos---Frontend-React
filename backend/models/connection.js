const mysql = require("mysql2")

const client = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306
});
try {
    client.connect();
    client.query("USE chollo");
} catch (error) {

}

module.exports = client;