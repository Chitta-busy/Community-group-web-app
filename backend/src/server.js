const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));
app.use('/uploads', express.static('src/uploads'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/communities', require('./routes/communityRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
require('./socket')(io);

connectDB().then(() => {
});
