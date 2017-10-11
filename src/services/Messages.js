import axios from 'axios';
import io from 'socket.io-client';

export default class Messages {

    constructor(socketAddr) {
        this._socketAddr = socketAddr;
        this._callbacks = [];

        this._createSocket();
    }

    _createSocket() {
        return new Promise((resolve, reject) => {
            this._socket = io(/*this._socketAddr, {
                path: '/ws'
            }*/);
            this._socket.on('chat.addMessage', (msg) => {
                this._callbacks.forEach(cb => {
                    cb(msg);
                });
            });
        });
    }

    getOld() {
        return axios.get('/old-messages').then(response => {
            return response.data;
        });
    }

    send(from, message) {
        return new Promise((resolve, reject) => {
            this._socket.emit('chat.message', {
                from,
                message
            });
            resolve();
        });
    }

    onNew(callback) {
        this._callbacks.push(callback);
    }

};
