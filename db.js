/* const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
   // trustServerCertificate: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    instancename: 'LAPTOP-L4K0EB02',
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('Azure SQL Connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sql,
  pool,
  connectDB,
}; */
console.log("DB STEP 1 - db.js loaded");
const sql = require('mssql');
//require('dotenv').config();
console.log("DB STEP 2 - mssql imported");
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 1433,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

//let pool;
console.log("DB STEP 3 - config created");

const connectDB = async () => {
  try {
    console.log("DB STEP 4 - connecting");

    await sql.connect(config);

    console.log("DB STEP 5 - Azure SQL Connected");
  } catch (err) {
    console.error("DB ERROR");
    console.error(err);
  }
};
module.exports = {
  sql,
  connectDB,
};