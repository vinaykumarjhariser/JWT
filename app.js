const express = require('express');
const mongoose = require('mongoose');
const app = express()
const JWT = require("./model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());
const authanticationToken = require('./middleware/auth');
const controller = require('./controller/controller')
const port = 8000
app.post('/signup',authanticationToken,controller.signup);

app.post('/signin',authanticationToken, controller.signin);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})