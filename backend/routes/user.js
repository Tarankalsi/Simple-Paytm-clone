const express = require('express');
const zod = require('zod');
const router = express.Router()
const { User, Account } = require('../db/index');
const bcrypt = require('bcryptjs');
const JWT_SECRET = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');


//SignUp Input Validation
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
})




// Signup Router
router.post('/signup', async (req, res) => {
    try {
        const body = req.body

        const { success } = signupSchema.safeParse(body)

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs"
            })
        }
        
        const user_exist = await User.findOne({ username: body.username })
        if (user_exist) {
            return res.status(409).json({
                success: false,
                message: "Email already taken "
            })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(body.password, salt)

        const user = await User.create({
            username: body.username,
            password: secPass,
            firstName: body.firstName,
            lastName: body.lastName
        })
        const userId = user._id

        const randomMoney = (Math.random() *10000)+1
        await Account.create({
            userId,
            balance : randomMoney
        })
        const token = jwt.sign({
            user_id: user._id
        }, JWT_SECRET)

        res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        console.error("Error during Signup", error)
        res.status(400).json({
            success: false,
            message: "Internal Error"
        })
    }

})


//signin input validation schema
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

//Signin Router
router.post('/signin', async (req, res) => {

    try {

        const body = req.body

        const { success } = signinSchema.safeParse(body)

        if (!success) {
            return res.status(411).json({
                success: false,
                message: "Error while logging in"
            })
        }

        const user = await User.findOne({
            username: body.username
        })

        if (!user) {
            return res.status(411).json({
                success: false,
                message: "Incorrect Credentials"
            })
        }

        const password_compare = await bcrypt.compare(body.password, user.password)

        if (!password_compare) {
            return res.status(411).json({
                success: false,
                message: "Incorrect Password"
            })
        }


        const token = jwt.sign({ user_id: user._id }, JWT_SECRET)

        res.status(200).json({
            success: true,
            token: token,
            firstName : user.firstName,
            lastName : user.lastName,
            username : user.username
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            message: "Internal Error"
        })
    }

})
//Update info input validation

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

//Update Information
router.put("/update", authMiddleware, async (req, res) => {

    try {

        const body = req.body
        const { success } = updateBody.safeParse(body)

        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Error While Updating Information"
            })
        }
        console.log(req.userId)
        await User.updateOne({ _id: req.userId }, body)

        res.status(200).json({
            success: true,
            message: "Updated Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            succes: false,
            message: "Internal Error"
        })
    }

})


router.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";

        // Use await to get the actual array of users
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter, "$options": "i" } }, // Case insensitive regex search
                { lastName: { "$regex": filter, "$options": "i" } }
            ]
        });

        // Return the users as JSON response
        res.status(200).json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        // Handle any errors
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router