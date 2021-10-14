const express = require('express')
const { auth } = require('./modules/middleware/auth')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!!!')
})

app.post('/login', (req, res) => {

    const userName = req.body.user
    const password = req.body.password
    
    if (!userName || !password) {
        res.status(401)
    }

    const token = auth(userName, password)
    if (token) {
        res.status(200).send({ auth: true, token: token })
    } else {
        res.status(401)
    }
})


app.get('/health', (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date()
    }

    res.status(200).send(data)
})

const bootup = require('./helpers/bootup')
const { sign } = require('./modules/middleware/auth')

bootup.start().then( () => {
    app.listen(3000, () => console.log('[log] Server listen on localhost:3000'))
})

const contacts = require('./routes/contacts')
app.use('/contacts', contacts)

