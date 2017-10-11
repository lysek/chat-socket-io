const express = require('express');
const app = express();
const r = require('rethinkdb');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    //path: '/ws'
});

r.connect({host: 'localhost', port: 28015}, (err, connection) => {
    if (err) {
        throw err;
    }

    io.on('connection', (socket) => {
        socket.on('chat.message', function(msg){
            r.db('chat').table('messages').insert({
                time: Date.now(),
                from: msg.from,
                message: msg.message
            }).run(connection, err => {
                if (err) throw err;
            });
        });
    });

    r.db('chat').table('messages').changes().run(connection, (err, cursor) => {
        if (err) throw err;
        cursor.each((err, row) => {
            if (err) throw err;

            if(row.new_val) {
                io.emit('chat.addMessage', row.new_val);
            }
        });
    });

    app.get('/old-messages', (req, res) => {
        r.db('chat').table('messages').orderBy(r.desc('time')). limit(10).run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }

            cursor.toArray((err, result) => {
                if (err) {
                    throw err;
                }

                res.send(result);
            });
        });
    });

});

app.use('/', express.static('public'));

http.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
