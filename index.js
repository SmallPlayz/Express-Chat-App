const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { orgin: '*'}})
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/chat', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    res.cookie('username', username, { maxAge: 90 * 24 * 60 * 60 * 1000 });
    res.cookie('password', password, { maxAge: 90 * 24 * 60 * 60 * 1000 });
    res.render('chat')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/logout', (req, res) => {
    res.cookie('username', '', { maxAge: 0 });
    res.cookie('password', '', { maxAge: 0 });
    res.redirect('/')
})
    
server.listen(3000, () => {
    console.log('Server is running...')
})  

io.on('connection', (socket) => {
    //console.log('User connected: ' + socket.id);

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
});