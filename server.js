const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());



app.listen(PORT, () => {
    console.log(`Server now active on port ${PORT}!!`);
});