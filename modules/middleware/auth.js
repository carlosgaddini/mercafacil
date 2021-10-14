const jwt = require('jsonwebtoken')
const SECRET = 'carlosgaddini'

function auth(userName, password) {
    // mokada
    if (userName === 'macapa' && password === '123456') {
        const token = jwt.sign({userID: 1}, SECRET, { expiresIn: 300})
        return token
    } else if (userName === 'varejao' && password === '098765') {
        const token = jwt.sign({userID: 2}, SECRET, { expiresIn: 3000})
        return token
    } else {
        return false
    }
}

function validate(token) {
    try {
        var decoded = jwt.verify(token, SECRET);
        return decoded.userID
      } catch(err) {
        console.log('[log] auth error:' + err.message)
      }
}

module.exports = { auth, validate }