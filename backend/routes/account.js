const express = require('express');
const zod = require('zod');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');


const router = express.Router()

//Getting Balance Router
router.post("/balance", authMiddleware, async (req, res) => {

    try {

        const account = await Account.findOne({ userId: req.userId })
        res.status(200).json({
            success: true,
            balance: account.balance
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "INternal Error"
        })
    }

})



//Transfer Money Router
router.post("/transfer", authMiddleware, async (req, res) => {

    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const { amount, to } = req.body

        // Fetch the accounts within the transaction
        const account = await Account.find({ userId: req.userId }).session(session)

        if (!account || account.balance < amount) {
            await session.abortTransaction()
            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({ userId: to }).session(session)

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: " Invalid Account"
            })
        }
        //Perform the Transfer
        await Account.updateOne({ userId: req.userId }, {
            $inc: {
                balance: -amount
            }
        }).session(session)

        await Account.updateOne({ userId: to }, {
            $inc: {
                balance: amount
            }
        }).session(session)

        //Commit the transaction
        session.commitTransaction();

        res.status(200).json({
            success: true,
            message: "Transfer successful"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success : false,
            message : "Internal Error"
        })
    }


})

module.exports = router