const pg = require('pg')

function conn() {
    const connection = new pg.Client({
        user: 'admin',
        host: 'localhost',
        database: 'varejao',
        password: 'admin',
        port: '5432'
    })

    connection.connect()
    console.log("[log]] PostgreSQL connection ok.")

    return connection
}

module.exports = { conn }