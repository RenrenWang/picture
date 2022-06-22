"use strict";

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "47.103.89.196",
  port: "3306",
  user: "root",
  password: "123456",
  database: "picture",
});

exports._query = (sql, params, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return callback(err, null, null);
    }

    connection.query(sql, params, function () {
      callback.apply(connection, arguments);
      connection.release();
    });
  });
};
