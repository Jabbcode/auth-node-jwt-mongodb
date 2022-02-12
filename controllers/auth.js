
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const User = require('../models/User');

const signIn = async (req, res) => {

    const { username, password } = req.body;
    const usuario = await User.findOne({username});

    if (usuario) {
        return res.status(400).json({
            message: 'This username already exists'
        });
    }

    const dbUser = new User( req.body );

    if (!username) {
        return res.status(400).json({
            message: 'You must enter a username'
        });
    }

    if (!password) {
        return res.status(400).json({
            message: 'You must enter a password'
        });
    }

    const salt = bcrypt.genSaltSync(10);
    dbUser.password = bcrypt.hashSync(password, salt);

    const token = await generarJWT(dbUser.id, dbUser.username);

    await dbUser.save();

    return res.status(200).json({
        uuid: dbUser.id,
        username: dbUser.username,
        token
    });
}

const logIn = async (req, res) => {
    const { username, password } = req.body;

    const dbUser = await User.findOne({username});

    if (!dbUser) {
        return res.status(400).json({
            message: 'The credentials are incorrect'
        });
    }

    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if (!validPassword) {
        return res.status(400).json({
            message: 'The credentials are incorrect'
        });
    }

    const token = await generarJWT(dbUser.id, dbUser.username);

    return res.status(200).json({
        uuid: dbUser.id,
        username: dbUser.username,
        token
    });
}

const getUsers = async (req, res = response) => {

    const users = await User.find();
    res.status(200).json(users);
}

module.exports = {
    logIn, signIn, getUsers
}