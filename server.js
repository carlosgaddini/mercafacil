
(async () => {

    const bootup = require('./modules/bootup')

    bootup.start().then( () => {

        selectMacapa()

        selectVarejao()
        
    })

})()


async function selectMacapa() {
    const my = global.mysql
    const [rows] = await my.query('SELECT * FROM contacts')
    console.log(rows)
}

async function selectVarejao() {
    const pg = global.pg
    const query = await pg.query('SELECT * FROM contacts')
    console.log(query.rows)
}