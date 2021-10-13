const mysql = require('./databases/mysql')
const pg = require('./databases/postregresql')

async function start() {
    if(global.mysql && global.mysql.state !== 'disconnected')
        return global.mysql
    global.mysql = await mysql.conn()

    if(global.pg)
        return global.pg
    global.pg = await pg.conn()

}

module.exports = { start }