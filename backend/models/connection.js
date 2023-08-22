const mysql = require("mysql")

const client = mysql.createConnection({
    host: "172.0.0.1",
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