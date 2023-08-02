const mysql = require("mysql")

const client = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
    // host: "localhost",
    // user: "root",
    // password: "",
    // port: 3306
});
try {
    client.connect();
    client.query("USE dac_rapide");
} catch (error) {

}

module.exports = client;