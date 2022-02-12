require('dotenv').config();
const { dbConnection } = require('./db/config');
const express = require('express');
const app = express();

dbConnection();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})