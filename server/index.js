const http = require('http');
const {
  v4: uuidv4
} = require('uuid');

const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    // cors policy supports for below domains
    origin: ['http://localhost:5000', 'http://localhost:8080'], //todo get from config
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 9000;

/**
 * Custom session id creation
 */
io.engine.generateId = () => {
  return uuidv4();
}

/**
 * Middleware to check request header origin
 */
io.use((socket, next) => {
  const handshakeData = socket.request;
  const supportiveOrigin = process.env.SUPPORTED_ORIGIN || 'http://localhost:5000'
  if (handshakeData.headers.origin !== supportiveOrigin) {
    console.log('frontend origin: ' + handshakeData.headers.origin);
    console.log('supported origin: ' + supportiveOrigin);
    console.log('Not Authenticated');
    return next(new Error("Not Authenticated"));
  }
  return next();
});

/**
 * Socket connection handler 
 */
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(PORT);