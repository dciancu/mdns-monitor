#!/usr/bin/env node

const sockets = [];
const { Scanner, Services } = require('mdns-scanner');
const scanner = new Scanner({loopback: false});
const services = new Services(scanner);

scanner.on('packet', (packet, rinfo) => {
    // console.log(JSON.stringify(packet, null, '  '));
    // console.log(JSON.stringify(rinfo, null, '  '));
    sockets.forEach(socket => socket.emit('packet', packet, rinfo));
});
services.on('discovered', service => {
    // console.log(service);
    // console.log(services.namedServices);
    sockets.forEach(socket => socket.emit('services', services.namedServices));
});
scanner.init().then(ready => {
    if (! ready) {
        throw new Error('Scanner not ready after init.');
    }
    console.log('Started monitoring mDNS.');
}).catch(error => {
    console.log('CAUGHT ERROR', error.message);
    process.exit(1);
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
app.get('/services', (req, res) => {
    res.json(services.namedServices);
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

    socket.on('services', () => socket.emit('services', services.namedServices));
});

const address = process.env.WEB_ADDRESS || '0.0.0.0';
const port = process.env.WEB_PORT || '3000';
server.listen(port, address, () => {
    console.log('Web server started at http://' + address + (port == '80' ? '' : ':' + port));
});
