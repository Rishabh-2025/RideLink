const socketIo = require('socket.io');
const userModel = require('./models/userModel');
const captainModel = require('./models/captainModel');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {



        console.log(`Client connected`);
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.coordinates[0] || !location.coordinates[1]) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            
            
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [location.coordinates[0], location.coordinates[1]]
                }
            });

        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };