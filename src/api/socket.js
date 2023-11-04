/* eslint-disable @typescript-eslint/no-var-requires */
const { errorNotification } = require('../utils/notification');

const API_URL = process.env.REACT_APP_API_URL || '';
const socket = new WebSocket(API_URL);

socket.onerror = (error) => {
  errorNotification(`Error sending data via WebSocket:${error.message}`);
};

module.exports = {
  socket,
};
