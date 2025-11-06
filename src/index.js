// src/index.js
/* eslint-env node */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mountRoutes = require('./routes/index.routes.js');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
// bật CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // cho phép FE gọi
    credentials: true, // nếu cần gửi cookie/token
  }),
);
app.use(express.json());
app.use((req, _res, next) => {
  req.prisma = prisma;
  next();
});
// tạo file route chung
mountRoutes(app);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 http://localhost:${port}`));
