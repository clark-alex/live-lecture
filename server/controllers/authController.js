const bcrypt = require('bcryptjs')

module.exports = {
    registerUser: (req, res) => {
        const { username, password, email, status } = req.body
        const db = req.app.get('db')
        db.verify_user([username]).then(user => {
            if (user.length !== 0) {
                res.status(200).send('Username Taken. Try another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
       
                db.register_user([username, hash, email, status]).then((user) => {
                    req.session.user.session_id = user[0].user_id
                    req.session.user.user_id = user[0].user_id
                    req.session.user.username = user[0].username
                    console.log('registered: ', req.session)
                    res.status(200).send()
                })
            }
        })
    },
    loginUser: (req, res) => {
        const { username, password } = req.body
        const db = req.app.get('db')
        db.verify_user([username]).then(user => {
            console.log(user)
            if (user.length !== 0) {
                const validPassword = bcrypt.compareSync(password, user[0].password)
                if (validPassword) {
                    req.session.user.session_id = user[0].user_id
                    req.session.user.user_id = user[0].user_id
                    req.session.user.username = user[0].username
                    console.log(req.session.user)
                    res.status(200).send('welcome')
                } else {
                    res.status(200).send('Invalid Password')
                }
            } else {
                res.status(200).send('Username does not exist')
            }
        })
    },
    logout: (req,res) => {
        const db = req.app.get('db')
        req.session.destroy()
        res.status(200).send('successful logout')
    }

}