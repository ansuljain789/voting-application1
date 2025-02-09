
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const Candidate = require('../models/candidate')
const crypto = require("crypto");
const twilio = require('twilio');
const OTP_EXPIRATION_TIME = 5 * 60 * 1000

// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the User data

        // Check if there is already an admin user
        const adminUser = await User.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Validate Aadhar Card Number must have exactly 12 digit
        if (!/^\d{12}$/.test(data.aadharCardNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Check if a user with the same Aadhar Card Number already exists
        const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {aadharCardNumber, password} = req.body;

        // Check if aadharCardNumber or password is missing
        if (!aadharCardNumber || !password) {
            return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
        }

        // Find the user by aadharCardNumber
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Aadhar Card Number or Password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        // res.json({token})
        res.json({ token, role: user.role });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
// router.get('/profile', jwtAuthMiddleware, async (req, res) => {
//     try{
//         const userData = req.user;
//         const userId = userData.id;
        
//         const user = await User.findById(userId);
//         console.log(user);
        
//         res.status(200).json({user});
//     }catch(err){
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token

        // Find user and exclude password and __v fields
        const user = await User.findById(userId).select('-_id -password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      console.log(user);
      
        res.status(200).json(user); // Send filtered user details
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the id from the token
        const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

        // Check if currentPassword and newPassword are present in the request body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
        }

        // Find the user by userID
        const user = await User.findById(userId);

        // If user does not exist or password does not match, return error
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// let's start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res)=>{
    // no admin can vote
    // user can only vote once
    
    const candidateID = req.params.candidateID;
    const userId = req.user.id;

    try{
        // Find the Candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }
        else if(user.role == 'admin'){
            return res.status(403).json({ message: 'admin is not allowed'});
        }
        else if(user.isVoted){
            return res.status(400).json({ message: 'You have already voted' });
        }
        // console.log(user);
        
        

        // Update the Candidate document to record the vote
        candidate.votes.push({user: userId})
        candidate.voteCount++;
        await candidate.save();

        // update the user document
        user.isVoted = true
        await user.save();

        console.log("vote record successfully");
        console.log(user);
        
        
        return res.status(200).json({ message: 'Vote recorded successfully' });
        
        
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    } 
});



module.exports = router;
