const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { orgin: '*'}})


app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
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