// Import the mssql package
require("dotenv").config({ path: __dirname + "/../.env" });
var sql = require("mssql");
const fs = require("fs");
const csv = require("csv-parser");
const bcrypt = require("bcryptjs");

// Create a configuration object for our Azure SQL connection parameters
var dbConfig = {
  server: process.env.SERVER, // Use your SQL server name
  database: process.env.DATABASE, // Database to connect to
  user: process.env.USER, // Use your username
  password: process.env.PASSWORD, // Use your password
  port: parseInt(process.env.DB_PORT),
  // Since we're on Windows Azure, we need to set the following options
  options: {
    encrypt: true,
  },
};

let connectionPool;

async function connectToDB() {
  const conn = new sql.ConnectionPool(dbConfig);
  connectionPool = await conn.connect();
  console.log("Connected to DB");
}

async function getAllServicesByEmail(email) {
  const query = `SELECT * FROM CSServices WHERE email = '${email}'`;
  let request = await connectionPool.request().query(query);
  console.log(`Executed: ${query}`);
  return request.recordset;
}

async function addServiceToDB(service, email) {
  const query = `INSERT INTO CSServices 
                  (email, treatmentNumber, treatmentInformation, tDate, workerEmail, carNumber)
                  VALUES 
                  (@email, @treatmentNumber, @treatmentInformation, @tDate, @workerEmail, @carNumber)`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .input("treatmentNumber", sql.VarChar, service.treatmentNumber)
    .input("treatmentInformation", sql.VarChar, service.treatmentInformation)
    .input("tDate", sql.Date, service.treatmentDate)
    .input("workerEmail", sql.VarChar, service.workerEmail)
    .input("carNumber", sql.VarChar, service.carNumber)
    .query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function deleteServiceByNumber(serviceNumber) {
  const query = `delete FROM CSServices WHERE treatmentNumber = '${serviceNumber}'`;
  const result = await connectionPool.request().query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function updateExistingService(service) {
  const query = `UPDATE CSServices SET
                treatmentInformation = @treatmentInformation,
                tDate = @tDate,
                workerEmail = @workerEmail,
                carNumber = @carNumber
                WHERE
                treatmentNumber = @treatmentNumber`;
  const result = await connectionPool
    .request()
    .input("treatmentNumber", sql.VarChar, service.treatmentNumber)
    .input("treatmentInformation", sql.VarChar, service.treatmentInformation)
    .input("tDate", sql.Date, service.treatmentDate)
    .input("workerEmail", sql.VarChar, service.workerEmail)
    .input("carNumber", sql.VarChar, service.carNumber)
    .query(query);

  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function validateUserExist(email) {
  const getUserQuery = `SELECT email from CSUsers WHERE email = @email`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .query(getUserQuery);
  return result.recordset;
}

async function updateUserPassword(email, newPassword) {
  const query = `UPDATE CSUsers SET
                  uPassword = @newPassword
                  WHERE
                  email = @email`;
  const hash = await bcrypt.hash(newPassword, 10);

  const request = await connectionPool.request();
  request.input("email", sql.VarChar, email);
  request.input("newPassword", sql.VarChar, hash);

  const result = await request.query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function addUserToDB(userReg) {
  const query = `INSERT INTO CSUsers 
  (firstName, lastName, email, uPassword)
  VALUES 
  (@firstName, @lastName, @email, @uPassword)`;
  // hash password for security reasons
  const hash = await bcrypt.hash(userReg.password, 10);
  const result = await connectionPool
    .request()
    .input("firstName", sql.NVarChar, userReg.firstName)
    .input("lastName", sql.NVarChar, userReg.lastName)
    .input("email", sql.VarChar, userReg.email)
    .input("uPassword", sql.VarChar, hash)
    .query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function getUserFromDB(userAuth) {
  const query = `SELECT * from CSUsers WHERE email = @email`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, userAuth.email)
    .query(query);
  // if user found
  if (result.recordset.length > 0) {
    // compare hashed passwords
    const dbHash = result.recordset[0].uPassword;
    const validPass = await bcrypt.compare(userAuth.password, dbHash);
    // if valid -> return the user
    if (validPass) {
      console.log(`Executed: ${query}`);
      return result.recordset;
    } else {
      // password not match
      console.log(`Executed: ${query} Not found`);
      return [];
    }
  } else {
    // user not found
    return [];
  }
}

module.exports = {
  getAllServicesByEmail,
  addUserToDB,
  getUserFromDB,
  connectToDB,
  addServiceToDB,
  deleteServiceByNumber,
  updateExistingService,
  updateUserPassword,
  validateUserExist,
};
