const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');



// Get all users
router.get('/', async (req, res) => {
    let users = await User.find({});
    res.send(users);
});

// Register User
router.post('/register',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email id').isEmail(),
    check('password', 'Password should be of 8 characters').isLength({min: 8}),
    check('role', 'Please select a role').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, role} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }
        user = new User({name, email, password, role});
        await user.save();
        let token = user._id;
        res.status(200).json({token,user});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    
});

//Login User
router.post('/login',[
    check('email', 'Please enter valid email id').isEmail(),
    check('password', 'Password should be of 8 characters').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'User not registered'})
        }
        let token = user._id;
        res.status(200).json({token,user});
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
    
});


module.exports = router;
