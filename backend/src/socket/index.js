const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join-community', (communityId) => socket.join(`community:${communityId}`));

    socket.on('typing', (payload) => {
      socket.to(payload.room).emit('typing', payload);
    });

    socket.on('send-message', async (payload) => {
      const message = await Message.create(payload);
      const event = { ...message.toObject(), tempId: payload.tempId };
      if (payload.community) io.to(`community:${payload.community}`).emit('new-message', event);
      if (payload.recipient) io.to(payload.recipient).emit('new-message', event);
      io.to(payload.sender).emit('new-message', event);
    });

    socket.on('register-user', (userId) => socket.join(userId));

    socket.on('read-message', ({ messageId, userId }) => {
      io.emit('read-receipt', { messageId, userId });
    });
  });
};
