#!/usr/bin/env node

const sockets = [];
const mDnsSd = require('node-dns-sd');

mDnsSd.ondata = (packet) => {
    // console.log('mdns packet received');
    // console.log(JSON.stringify(packet, null, '  '));

    sockets.forEach(socket => socket.emit('packet', packet));
};

mDnsSd.startMonitoring().then(() => {
    console.log('Started monitoring mDNS.');
});

const express = require('express');
const {createServer} = require('node:http');
const {join} = require('node:path');
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
app.get('/socket.io.js', (req, res) => {
    res.sendFile(join(__dirname, 'node_modules/socket.io/client-dist/socket.io.js'));
});
app.get('/bulma.min.css', (req, res) => {
    res.sendFile(join(__dirname, 'bulma.min.css'));
});
app.get('/pretty-print-json.js', (req, res) => {
    res.sendFile(join(__dirname, 'node_modules/pretty-print-json/dist/pretty-print-json.min.js'));
});
app.get('/pretty-print-json.css', (req, res) => {
    res.sendFile(join(__dirname, 'node_modules/pretty-print-json/dist/css/pretty-print-json.dark-mode.css'));
});

io.on('connection', (socket) => {
    sockets.push(socket);
    socket.on('disconnect', () => {
        sockets.splice(sockets.indexOf(socket), 1);
    });
});

server.listen(80, '0.0.0.0', () => {
    console.log('Web server started.');
});
