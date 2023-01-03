const express  = require('express');
const User     = require('../models/userModel');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const router   = express.Router();
const secret   = process.env.JWT_SECRET;

router.post('/register', (req, res) => {
   
    const result = createUser(req.body);

    result.then((user) => {
        res.status(200).json({
            success: true,
            user 
        });
        
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: err
        });
    });
});

router.post('/login', async (req, res) => {

    if(!req.body.email || !req.body.password){
        return res.status(404).json({
            success: false,
            error: 'email or password cannot be empty'
        });
    }
   
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(404).json({
            success: false,
            error: 'user not found'
        });
    }

    if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin
        }, secret, { expiresIn: '1d' });

        req.session.iduser = user._id.toString();
        req.session.email  = req.body.email;

        return res.status(200).json({
            success: true,
            user: user.email,
            token
        });
    }else{
        return res.status(404).json({
            success: false,
            error: 'user or password is wrong'
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).json({
        success: true,
        msg: 'session destroyed'
    });
});

async function createUser(body){

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        isAdmin: body.isAdmin
    });

    return await user.save();
}

module.exports = router;