const express = require('express')
const { validate } = require('../modules/middleware/auth')
const router = express.Router()

router.get('/', async (req, res)  => {

    const token = req.headers['x-access-token']

    userId = validate(token)

    if (userId === 1){
        selectMacapa().then( (ret) => {
            res.status(200).json(ret)
        })
    } else if (userId === 2){
        selectVarejao().then( (ret) => {
            res.status(200).json(ret)
        })
    } else {
        res.status(401)
    }

})

router.post('/', (req, res) => {
    const token = req.headers['x-access-token']

    userId = validate(token)
    const contacts = req.body.contacts

    if (userId === 1){

        contacts.forEach(contact => {
            insertMacapa(contact)
        });

        selectMacapa().then( (ret) => {
            res.status(200).json(ret)
        })
    } else if (userId === 2){

        contacts.forEach(contact => {
            insertVarejao(contact)
        });

        selectVarejao().then( (ret) => {
            res.status(200).json(ret)
        })
    } else {
        res.status(401)
    }

})

module.exports = router


async function selectMacapa() {
    const my = global.mysql
    const [rows] = await my.query('SELECT * FROM contacts')
    return rows
}

async function insertMacapa(contact) {
    const my = global.mysql
    const sql = 'INSERT INTO contacts (nome, celular) VALUES (?,?)'

    const cellphone = contact.cellphone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4")

    return await my.query(sql,[contact.name, contact.cellphone])
}

async function selectVarejao() {
    const pg = global.pg
    const query = await pg.query('SELECT * FROM contacts')
    return query.rows
}

async function insertVarejao(contact) {
    const my = global.pg
    const sql = 'INSERT INTO contacts (nome, celular) VALUES ($1,$2)'
    return await my.query(sql,[contact.name, contact.cellphone])
}

let formatPhoneNumber = (str) => {
    
    let match = str.match(/^(2|)?(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      let intlCode = (match[1] ? '+55 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    
    return null;
  }