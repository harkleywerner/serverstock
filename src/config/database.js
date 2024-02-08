import mysql from "mysql2/promise";
import dotenv from "dotenv"
dotenv.config()

const user = process.env.SQL_USER
const host = process.env.SQL_HOST
const password = process.env.SQL_PASSWORD
const database = process.env.SQL_DATABASE

const mysqlDB =  mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
})

const startConnection =  () => {

       return mysqlDB

}

export default startConnection