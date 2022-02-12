const jwt = require('jsonwebtoken');

const generarJWT = async (uid, name) => {
    const payload = { uid, name };

    return new Promise( (resolve, reject ) => {
        jwt.sign( payload, process.env.SECRET_KEY_JWT, { 
            expiresIn: '24h' 
        }, (err, token) => { 
            if( err ) {
                console.log( err );
                reject( err );
            } else {
                resolve( token );               
            }
        });
    });
}


module.exports = {
    generarJWT
}