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

const sql = require('mssql');

require('dotenv').config();

const config = {

  user: process.env.DB_USER,

  password:
    process.env.DB_PASSWORD,

  server:
    process.env.DB_SERVER,

  database:
    process.env.DB_DATABASE,

  options: {

    encrypt: true,

    trustServerCertificate: true,

  },

};

//let pool;

const connectDB = async () => {

  try {

      await sql.connect(config);

    console.log(
      'Azure SQL Connected'
    );

  } catch (error) {

    console.log(error);

  }
};

module.exports = {
  sql,
  connectDB,
};