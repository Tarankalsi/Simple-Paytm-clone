const jwt = require('jsonwebtoken');
const  JWT_SECRET  = require('./config');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success : false ,
            message : "Error: Missing or invalid Authorization header"
        })
    }
    
    const authToken =  authHeader.split(" ")[1]


    try {
        const decoded = jwt.verify(authToken,JWT_SECRET)
       
        req.userId = decoded.user_id
        next();
    } catch (error) {
        res.status(403).json({
            success : false ,
            message: "Internal Error"
        })
    }
    
}  

module.exports = {
    authMiddleware
}