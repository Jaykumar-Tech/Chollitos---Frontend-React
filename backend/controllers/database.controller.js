
const async = require("async")
const mysql = require("mysql")

exports.create = async (req, res) => {
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
    async.series([
        function connect(callback) {
            client.connect(callback);
            console.log('Connected!');
        },
        function clear(callback) {
            client.query('DROP DATABASE IF EXISTS dac_rapide', callback);
        },
        function create_db(callback) {
            client.query('CREATE DATABASE dac_rapide', callback);
        },
        function use_db(callback) {
            client.query('USE dac_rapide', callback);
        },
        function create_table(callback) {
            client.query(`CREATE TABLE users  (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        role varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        status tinyint(1) NOT NULL,
        created_at timestamp(0) NULL DEFAULT NULL,
        updated_at timestamp(0) NULL DEFAULT NULL,
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX users_email_unique(email) USING BTREE
      ) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;`,
                callback);
        },
        function endConnection(callback) {
            client.end(callback);
        }
    ], function (err, results) {
        if (err) {
            return res.json({
                err: err
            })
        } else {
            // initRoute();
            return res.json({
                message: "success"
            })
            console.log('Database initialization complete.');
            // init();
        }
    });
}

exports.connect = async (req, res) => {
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

    async.series([
        function connect(callback) {
            client.connect(callback);
            console.log('Connected!');
        },
        function use_db(callback) {
            client.query('USE dac_rapide', callback);
        },
        function endConnection(callback) {
            client.end(callback);
        }
    ], function (err, results) {
        if (err) {
            return res.json({
                err: err
            })
        } else {
            // initRoute();
            return res.json({
                message: "success"
            })
        }
    });
}