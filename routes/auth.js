const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { logIn, signIn, getUsers } = require('../controllers/auth');

router.get('/', [ validarJWT ], getUsers);

router.post('/', logIn); 
router.post('/new', signIn); 

module.exports = router;