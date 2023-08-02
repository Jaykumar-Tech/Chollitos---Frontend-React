
const async = require("async")
const mysql = require("mysql")
const client = require("../models/connection")

exports.create = async (req, res) => {
    async.series([
        function clear(callback) {
            client.query('DROP DATABASE IF EXISTS dac_rapide', callback);
        },
        function create_db(callback) {
            client.query('CREATE DATABASE dac_rapide', callback);
        },
        function use_db(callback) {
            client.query('USE dac_rapide', callback);
        },
        function create_user_table(callback) {
            client.query(`CREATE TABLE users  (
                id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                firstname varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                lastname varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                role varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                status tinyint(1) NOT NULL DEFAULT 1,
                review varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '[0,0,0,0,0]',
                avatar varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
                balance int(4) NULL DEFAULT 0,
                created_at timestamp(0) NULL DEFAULT NULL,
                updated_at timestamp(0) NULL DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE,
                UNIQUE INDEX users_email_unique(email) USING BTREE
              ) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;`,
                callback);
        },
        // function endConnection(callback) {
        //     client.end(callback);
        // }
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
    async.series([
        function use_db(callback) {
            client.query('USE dac_rapide', callback);
        },
        // function endConnection(callback) {
        //     client.end(callback);
        // }
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