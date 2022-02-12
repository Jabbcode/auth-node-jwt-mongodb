const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            message: 'Token error'
        })
    }

    try {
        
        const { uid, name } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.uid = uid,
        req.name = name

    } catch (error) {
        console.log( error )
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    next();
} 


module.exports = {
    validarJWT
}