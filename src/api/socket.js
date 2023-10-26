const API_URL = process.env.REACT_APP_API_URL || '';
const socket = new WebSocket(API_URL);

export default socket;
