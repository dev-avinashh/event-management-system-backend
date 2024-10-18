
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware= (req,res,next) =>{

    const authHeader = req.headed("Authorization")

    if(!authHeader){
        return res.status(401).json({message:'No Token Provided'})
    }

    const token = authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({message:"Unauthorized user"})
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded
        next();
        
    } catch (error) {
        return res.status(401).json({message:"Invalid Token"})
        
    }
}