const my = require("mysql2/promise")

async function conn(){
    const connection = await my.createConnection("mysql://admin:admin@localhost:3306/admin")
    console.log("[log]] MySQL connection ok.")
    return connection
}

module.exports = { conn }